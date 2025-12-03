"use client";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Listbox,
  ListboxItem,
  ScrollShadow,
  Chip,
  Avatar,
  Input,
  Button,
  Pagination,
} from "@heroui/react";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { useEffect, useState } from "react";
import { errorToast } from "@/utils/toaster";
import { toLocalCurrency } from "@/utils/currencies";
import { useProductsStore } from "@/stores/product-stores";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { convertProductToInvItem } from "@/utils/inv-converter";
import { NormalLoader } from "../loaders/normal-loader";
import { MaterialColors } from "@/utils/colors";
export const InvSelectionModal = ({
  open,
  onCloseModal,
}: {
  open: boolean;
  onCloseModal?: () => void;
}) => {
  const [search, setSearch] = useState("");
  const invItems = useInvSelect();
  const products = useProductsStore();
  const [selectedKeys, setSelectedKeys] = React.useState<Set<string | number>>(
    new Set()
  );

  // 1. Fetch products when the component mounts
  useEffect(() => {
    products.fetchProducts(1);
  }, []);

  // 2. Synchronize selectedKeys with invItems.list whenever invItems.list changes
  useEffect(() => {
    const keys = invItems.list.map((item) => item.id);
    setSelectedKeys(new Set(keys));
  }, [invItems.list]);

  const { onClose } = useDisclosure();

  const topContent = React.useMemo(() => {
    // ... (Your existing topContent logic) ...
    if (!invItems.list.length) {
      return null;
    }
    return (
      <ScrollShadow
        hideScrollBar
        className="w-full flex py-0.5 px-2 gap-1"
        orientation="horizontal"
      >
        {invItems.list.map((value) => (
          <Chip key={value.id}>{value.name}</Chip>
        ))}
      </ScrollShadow>
    );
  }, [invItems.list.length]);

  const handleSelectionChange = (keys: Set<React.Key>) => {
    const selectedKeysArray = Array.from(keys).filter(
      (key): key is string | number =>
        typeof key === "string" || typeof key === "number"
    );
    const newSelectedItems = products!.list.filter((product) =>
      selectedKeysArray.includes(product._id)
    );
    setSelectedKeys(new Set(selectedKeysArray));
    invItems.setList(newSelectedItems.map((e) => convertProductToInvItem(e)));
  };
  return (
    <>
      <Modal
        scrollBehavior="outside"
        backdrop={"opaque"}
        isOpen={open}
        onClose={() => {
          onCloseModal?.();
          onClose();
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Select Items
              </ModalHeader>
              <ModalBody className="gap-0">
                <div className="flex items-center gap-1">
                  <Input
                    label="search for items"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Button
                    isIconOnly
                    onPress={() => {
                      products.fetchProducts(1, search);
                    }}
                  >
                    <FiSearch />
                  </Button>
                </div>
                {!products.loading && (
                  <Listbox
                    classNames={{
                      base: "max-w-xs",
                      list: "max-h-[300px] overflow-scroll",
                    }}
                    selectedKeys={selectedKeys}
                    defaultSelectedKeys={["1"]}
                    items={products!.list}
                    label="Assigned to"
                    selectionMode="multiple"
                    topContent={topContent}
                    variant="flat"
                    onSelectionChange={(keys) =>
                      handleSelectionChange(keys as Set<React.Key>)
                    }
                  >
                    {products!.list.map((item, index) => (
                      <ListboxItem key={item._id} textValue={item.name}>
                        <div className="flex gap-2 items-center">
                          <Avatar
                            icon={
                              <div
                                dangerouslySetInnerHTML={{ __html: item.shape }}
                              />
                            }
                            style={{
                              color:
                                item.color > 0
                                  ? MaterialColors.intToHexARGB(
                                      item.color,
                                      true
                                    )
                                  : undefined,
                            }}
                            className={`shrink-0 `}
                            size="sm"
                            src={
                              item.avatar.length == 0 ? undefined : item.avatar
                            }
                          />
                          <div className="flex flex-col">
                            <span className="text-small">{item.name}</span>
                            <span className="text-tiny text-default-400">
                              {toLocalCurrency(item.price)}
                            </span>
                          </div>
                        </div>
                      </ListboxItem>
                    ))}
                  </Listbox>
                )}
                {products.loading && <NormalLoader />}
                {products.loaded &&
                  products.list.length == 0 &&
                  !products.loading && <>No Products Found</>}
                <Pagination
                  className="z-1"
                  page={products.page}
                  total={products.totalPages}
                  isDisabled={products.loading}
                  onChange={(page) => {
                    products.fetchProducts(page);
                  }}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
