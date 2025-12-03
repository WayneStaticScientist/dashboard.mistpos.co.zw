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
import { TProduct } from "@/types/product-t";
import { useProductState } from "@/stores/use-product-state";
import { useProductsStore } from "@/stores/product-stores";
import { errorToast } from "@/utils/toaster";
import { decodeFromAxios } from "@/utils/errors";
import { NormalLoader } from "../loaders/normal-loader";
export const DeleteProductModal = ({
  product,
  onCloseModal,
}: {
  product?: TProduct | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  const products = useProductsStore();
  const useProduct = useProductState();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={product != null}
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
                  Delete {product?.name}
                </ModalHeader>
                <ModalBody className="gap-4">
                  {useProduct.loading ? (
                    <NormalLoader />
                  ) : (
                    ` Are you sure to delete ${product?.name}?`
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
                        await useProduct.deleteProduct(product!);
                        onCloseModal?.();
                        onClose();
                        products.fetchProducts(1);
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
