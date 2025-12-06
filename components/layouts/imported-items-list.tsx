"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  ModalFooter,
} from "@heroui/react";
import { IoMdClose } from "react-icons/io";
import { useEffect, useState } from "react";
import { MaterialColors } from "@/utils/colors";
import { toLocalCurrency } from "@/utils/currencies";
import { useProductsStore } from "@/stores/product-stores";
import { getStockTrackStatus } from "@/utils/stock-tracking";
import { NormalLoader } from "../loaders/normal-loader";
export const ImportListModel = ({}: {}) => {
  const products = useProductsStore();
  useEffect(() => {
    if (products.importList.length == 0) return setIsOpen(false);
    setIsOpen(true);
    return () => {
      setIsOpen(false);
    };
  }, [products.importList]);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      {
        <Modal
          size="5xl"
          scrollBehavior="outside"
          backdrop={"opaque"}
          isOpen={products.importList.length > 0}
        >
          <ModalContent>
            <ModalHeader className="flex flex-col gap-1">
              Select Items ({products.importList.length})
            </ModalHeader>
            {products.uploadingImportedItems && <NormalLoader />}
            {!products.uploadingImportedItems && (
              <ModalBody className="gap-0">
                <div className="p-4 overflow-x-auto">
                  <Table
                    aria-label="Example static collection table max-w"
                    className="text-sm table-auto w-max sm:w-full cursor-grab"
                  >
                    <TableHeader>
                      <TableColumn>Item Name</TableColumn>
                      <TableColumn>Item Quantity</TableColumn>
                      <TableColumn>Item Cost</TableColumn>
                      <TableColumn>Item Price</TableColumn>
                      <TableColumn>Remove</TableColumn>
                    </TableHeader>
                    <TableBody>
                      {products.importList.map((e, index) => {
                        const stockReport = getStockTrackStatus({ product: e });
                        return (
                          <TableRow key={index}>
                            <TableCell>
                              <div
                                dangerouslySetInnerHTML={{ __html: e.shape }}
                                style={{
                                  color: MaterialColors.intToHexARGB(e.color),
                                }}
                              />
                              {e.name}
                            </TableCell>
                            <TableCell
                              className={`${
                                stockReport.report == "warning"
                                  ? "text-orange-600"
                                  : ""
                              }
                            ${stockReport.report == "low" ? "text-red-600" : ""}
                            `}
                            >
                              {stockReport.status}
                            </TableCell>
                            <TableCell>{toLocalCurrency(e.cost)}</TableCell>
                            <TableCell>{toLocalCurrency(e.price)}</TableCell>
                            <TableCell>
                              <Button
                                isIconOnly
                                onPress={() => {
                                  products.setImportList(
                                    products.importList.filter(
                                      (i) => i._id !== e._id
                                    )
                                  );
                                }}
                              >
                                <IoMdClose />
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
            )}
            <ModalFooter>
              <Button
                color="danger"
                variant="flat"
                onPress={() => {
                  products.setImportList([]);
                }}
              >
                Close
              </Button>
              <Button
                color="primary"
                isLoading={products.uploadingImportedItems}
                onPress={() => products.addImportedProducts()}
              >
                Upload
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      }
    </>
  );
};
