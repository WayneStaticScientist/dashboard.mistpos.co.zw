import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Listbox,
  ListboxItem,
  Input,
  Checkbox,
  Select,
  SelectItem,
} from "@heroui/react";
import { TProduct } from "@/types/product-t";
import { Fragment, useEffect, useState } from "react";
import { errorToast } from "@/utils/toaster";
import { useCategoriesStore } from "@/stores/categories-store";
export const EditProductModal = ({
  product,
  onCloseModal,
}: {
  product?: TProduct | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  const categories = useCategoriesStore();
  const [localProduct, setLocalProduct] = useState<TProduct | null>(
    product || null
  );
  const initializeLocalProduct = (productProp?: TProduct | null) => {
    if (productProp) {
      setLocalProduct({ ...productProp });
    } else {
      setLocalProduct(null);
    }
  };

  useEffect(() => {
    initializeLocalProduct(product);
  }, [product]);
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
              {localProduct && (
                <>
                  <ModalHeader className="flex flex-col gap-1">
                    {localProduct?.name}
                  </ModalHeader>
                  <ModalBody className="gap-4">
                    <Input
                      label="Item Name"
                      value={localProduct!.name}
                      onChange={(e) =>
                        setLocalProduct({
                          ...localProduct!,
                          name: e.target.value,
                        })
                      }
                    />
                    <Checkbox
                      defaultSelected={localProduct.isForSale}
                      onValueChange={(e) => {
                        setLocalProduct({
                          ...localProduct!,
                          isForSale: e,
                        });
                      }}
                    >
                      Item Is Available For Sale
                    </Checkbox>
                    <Select className="w-full" label="Select Category">
                      {categories.list.map((category, index) => (
                        <SelectItem key={category._id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </Select>
                    <div>
                      Sold By
                      <div className="flex flex-wrap items-center gap-3">
                        <Checkbox defaultSelected>Each</Checkbox>
                        <Checkbox defaultSelected>Weight</Checkbox>
                      </div>
                    </div>
                  </ModalBody>
                </>
              )}
            </Fragment>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
