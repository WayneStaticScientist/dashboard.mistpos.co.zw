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
import { TCategory } from "@/types/category-t";
import { decodeFromAxios } from "@/utils/errors";
import { NormalLoader } from "../loaders/normal-loader";
import { useCategoriesStore } from "@/stores/categories-store";
export const DeleteCategoryModal = ({
  category,
  onCloseModal,
}: {
  category?: TCategory | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  const categories = useCategoriesStore();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={category != null}
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
                  Delete {category?.name}
                </ModalHeader>
                <ModalBody className="gap-4">
                  {categories.loading ? (
                    <NormalLoader />
                  ) : (
                    ` Are you sure to delete ${category?.name}?`
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
                        await categories.deleteCategory(category!);
                        onCloseModal?.();
                        onClose();
                        categories.fetchCategories(1);
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
