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
import { TDiscount } from "@/types/discount-t";
import { decodeFromAxios } from "@/utils/errors";
import { NormalLoader } from "../loaders/normal-loader";
import { useDiscountsStore } from "@/stores/discount-store";
export const DeleteDiscountModal = ({
  discount,
  onCloseModal,
}: {
  discount?: TDiscount | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  const discounts = useDiscountsStore();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={discount != null}
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
                  Delete {discount?.name}
                </ModalHeader>
                <ModalBody className="gap-4">
                  {discounts.loading ? (
                    <NormalLoader />
                  ) : (
                    ` Are you sure to delete ${discount?.name}?`
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
                        await discounts.deleteDiscount(discount!);
                        onCloseModal?.();
                        onClose();
                        discounts.fetchDiscounts(1);
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
