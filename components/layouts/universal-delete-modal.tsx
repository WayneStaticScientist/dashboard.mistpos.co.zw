import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  ModalFooter,
  Button,
} from "@heroui/react";
import { Fragment } from "react";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import { NormalLoader } from "../loaders/normal-loader";
import { useCategoriesStore } from "@/stores/categories-store";
export const UniversalDeleteModel = ({
  title,
  summary,
  show,
  onDelete,
  isLoading,
  onCloseModal,
}: {
  title: string;
  show: boolean;
  summary: string;
  isLoading: boolean;
  onDelete?: () => void;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={show}
        onClose={() => {
          onCloseModal?.();
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalBody>
                {title && (
                  <ModalHeader className="flex flex-col gap-1">
                    {title}
                  </ModalHeader>
                )}
                {summary && (
                  <ModalBody className="gap-4">
                    {isLoading ? <NormalLoader /> : summary}
                  </ModalBody>
                )}
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="danger"
                    onPress={async () => {
                      onDelete?.();
                    }}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalBody>
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
