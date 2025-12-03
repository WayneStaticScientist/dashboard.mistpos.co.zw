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
import { TModifier } from "@/types/modefier-t";
import { decodeFromAxios } from "@/utils/errors";
import { NormalLoader } from "../loaders/normal-loader";
import { useMofiersStore } from "@/stores/modifiers-store";
export const DeleteModifierModal = ({
  modifier,
  onCloseModal,
}: {
  modifier?: TModifier | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  const modifiers = useMofiersStore();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={modifier != null}
        onClose={() => {
          onCloseModal?.();
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <Fragment>
              <ModalBody>
                <ModalHeader className="flex flex-col gap-1">
                  Delete {modifier?.name}
                </ModalHeader>
                <ModalBody className="gap-4">
                  {modifiers.loading ? (
                    <NormalLoader />
                  ) : (
                    ` Are you sure to delete ${modifier?.name}?`
                  )}
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button
                    color="danger"
                    onPress={async () => {
                      try {
                        await modifiers.deleteModifier(modifier!);
                        onCloseModal?.();
                        onClose();
                        modifiers.fetchModifiers(1);
                      } catch (e) {
                        errorToast(decodeFromAxios(e).message);
                      }
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
