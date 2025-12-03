import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Listbox,
  ListboxItem,
} from "@heroui/react";
import { TReceitModel } from "@/types/receit-type";
import { toLocalCurrency } from "@/utils/currencies";
import { Fragment } from "react/jsx-runtime";
export const ReceitModal = ({
  receit,
  onCloseModal,
}: {
  receit?: TReceitModel | null;
  onCloseModal?: () => void;
}) => {
  const { onClose } = useDisclosure();
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={receit != null}
        onClose={() => {
          onCloseModal?.();
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {receit?.label}
                {receit!.total}
              </ModalHeader>
              <ModalBody className="gap-0">
                <p>TOTAL</p>
                <h2 className="text-xl font-bold">
                  {toLocalCurrency(receit!.total)}
                </h2>
                <hr className="my-2 border-0 h-px bg-[#e6e6e620]" />
                <Listbox>
                  <ListboxItem description="Cashier">
                    {receit!.cashier}
                  </ListboxItem>
                </Listbox>
                <hr className="my-2 border-0 h-px bg-[#e6e6e620]" />
                Items
                <Listbox>
                  {receit!.items.map((item, index) => (
                    <ListboxItem
                      description={` ${item.count} x ${toLocalCurrency(
                        item.price
                      )}`}
                    >
                      <div className="flex justify-between">
                        <span> {item.name}</span>
                        <span> {toLocalCurrency(item.price * item.count)}</span>
                      </div>
                    </ListboxItem>
                  ))}
                </Listbox>
                {receit!.miniTax.length > 0 && (
                  <Fragment>
                    <hr className="my-2 border-0 h-px bg-[#e6e6e620]" />
                    Taxes
                    <Listbox>
                      {receit!.miniTax.map((item) => (
                        <ListboxItem description={` ${item.value}%`}>
                          {item.label}
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </Fragment>
                )}
                {receit!.discounts.length > 0 && (
                  <Fragment>
                    <hr className="my-2 border-0 h-px bg-[#e6e6e620]" />
                    Discounts
                    <Listbox>
                      {receit!.discounts.map((item) => (
                        <ListboxItem
                          description={` ${
                            item.percentageDiscount
                              ? `-${item.discount}%`
                              : `-${toLocalCurrency(item.discount)}`
                          }`}
                        >
                          {item.name}
                        </ListboxItem>
                      ))}
                    </Listbox>
                  </Fragment>
                )}
                <hr className="my-2 border-0 h-px bg-[#e6e6e620]" />
                Total
                <Listbox>
                  <ListboxItem description={toLocalCurrency(receit!.total)}>
                    Total
                  </ListboxItem>
                </Listbox>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
