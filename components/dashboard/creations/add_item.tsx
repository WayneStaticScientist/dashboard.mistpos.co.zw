"use client";
import { TProduct } from "@/types/product-t";
import {
  Button,
  Checkbox,
  Input,
  Navbar,
  NavbarBrand,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { MaterialColors } from "@/utils/colors";
import { IoIosArrowBack, IoMdAdd, IoMdClose } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { FC, Fragment, useEffect, useState } from "react";
import { useProductsStore } from "@/stores/product-stores";
import { useMofiersStore } from "@/stores/modifiers-store";
import { useInvSelect } from "@/stores/use-inv-select-store";
import { useProductState } from "@/stores/use-product-state";
import { useCategoriesStore } from "@/stores/categories-store";
import { MistDivider } from "@/components/layouts/mist-divider";
import { MistIconButton } from "@/components/buttons/icon-button";
import { NormalLoader } from "@/components/loaders/normal-loader";
import { MistColorButton } from "@/components/buttons/color-button";
import {
  toBaseCurrence,
  toLocalCurrenceString,
  toLocalCurrency,
} from "@/utils/currencies";
import { InvSelectionModal } from "@/components/layouts/inv-select-modal";
import useSessionState from "@/stores/session-store";

export const ItemModelCreate: FC = () => {
  const invStore = useInvSelect();
  const session = useSessionState();
  const navigation = useNavigation();
  const modifiers = useMofiersStore();
  const productState = useProductState();
  const categories = useCategoriesStore();
  const [invSelectorOpen, setInvSelectorOpen] = useState(false);
  const [localProduct, setLocalProduct] = useState<TProduct>({
    _id: "",
    name: "",
    isForSale: true,
    soldBy: "Each",
    price: 0,
    cost: 0,
    sku: "",
    barcode: "",
    isCompositeItem: false,
    useProduction: false,
    trackStock: false,
    stockQuantity: 0,
    lowStockThreshold: 0,
    modifiers: [],
    color: MaterialColors.listColors[0],
    shape: MaterialColors.listIcons[0],
    compositeItems: [],
    category: "",
    avatar: "",
    seller: "",
    company: "",
    syncOnline: false,
  });
  useEffect(() => {
    modifiers.fetchModifiers(1);
    categories.fetchCategories(1);
    invStore.setList([]);
  }, []);
  return (
    <div className="w-full flex items-center justify-center">
      <div className=" max-w-2xl w-full gap-4 flex flex-col">
        <Navbar>
          <NavbarBrand
            className=" cursor-pointer select-none"
            onClick={() => navigation.back()}
          >
            <IoIosArrowBack />
            <p className="font-bold text-inherit ml-3">Create New Item</p>
          </NavbarBrand>
        </Navbar>
        <InvSelectionModal
          open={invSelectorOpen}
          onCloseModal={() => {
            setInvSelectorOpen(false);
          }}
        />
        <div className="font-bold text-xl"> {localProduct.name}</div>
        <Input
          label="Item Name"
          value={localProduct.name}
          onChange={(e) =>
            setLocalProduct({
              ...localProduct!,
              name: e.target.value,
            })
          }
        />
        <Checkbox
          isSelected={localProduct.isForSale}
          onValueChange={(e) => {
            setLocalProduct({
              ...localProduct!,
              isForSale: e,
            });
          }}
        >
          Item Is Available For Sale
        </Checkbox>
        <Select
          className="w-full"
          label="Select Category"
          value={localProduct.category}
          onChange={(e) => {
            setLocalProduct({
              ...localProduct!,
              category: e.target.value,
            });
          }}
        >
          {categories.list.map((category) => (
            <SelectItem key={category._id}>{category.name}</SelectItem>
          ))}
        </Select>
        <div>
          Sold By
          <div className="flex flex-wrap items-center gap-3">
            <Checkbox
              isSelected={localProduct.soldBy == "Each"}
              onValueChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  soldBy: e ? "Each" : "Weight",
                });
              }}
            >
              Each
            </Checkbox>
            <Checkbox
              isSelected={localProduct.soldBy == "Weight"}
              onValueChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  soldBy: !e ? "Each" : "Weight",
                });
              }}
            >
              Weight
            </Checkbox>
            <Input
              value={toLocalCurrenceString(localProduct.price)}
              label="Price"
              startContent={session.baseCurrence ?? "USD"}
              onChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  price: parseFloat(e.target.value),
                });
              }}
            />
            {!localProduct.isCompositeItem && (
              <Input
                value={toLocalCurrenceString(localProduct.cost)}
                label="Cost"
                startContent={session.baseCurrence ?? "USD"}
                onChange={(e) => {
                  setLocalProduct({
                    ...localProduct!,
                    cost: parseFloat(e.target.value),
                  });
                }}
              />
            )}
            <Input
              value={localProduct.sku}
              label="SKU"
              onChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  sku: e.target.value,
                });
              }}
            />
            <Input
              value={localProduct.barcode}
              label="Bar Code"
              onChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  barcode: e.target.value,
                });
              }}
            />
          </div>
        </div>
        <MistDivider />
        Inventory Management
        <Checkbox
          isSelected={localProduct.isCompositeItem}
          onValueChange={(e) => {
            setLocalProduct({
              ...localProduct!,
              isCompositeItem: e,
            });
          }}
        >
          Is Composite Item
        </Checkbox>
        {localProduct.isCompositeItem && (
          <Fragment>
            <Checkbox
              isSelected={localProduct.useProduction}
              onValueChange={(e) => {
                setLocalProduct({
                  ...localProduct!,
                  useProduction: e,
                });
              }}
            >
              Use Productions
            </Checkbox>
          </Fragment>
        )}
        <Checkbox
          isSelected={localProduct.trackStock}
          onValueChange={(e) => {
            setLocalProduct({
              ...localProduct!,
              trackStock: e,
            });
          }}
        >
          Track Inventory
        </Checkbox>
        {localProduct.trackStock &&
          (!(localProduct.isCompositeItem && !localProduct.useProduction) ||
            !localProduct.isCompositeItem) && (
            <Fragment>
              <Input
                label="Stock Quantity"
                value={localProduct.stockQuantity.toString()}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct!,
                    stockQuantity: parseFloat(e.target.value),
                  })
                }
              />
              <Input
                label="Reorder Level"
                value={localProduct.lowStockThreshold.toString()}
                onChange={(e) =>
                  setLocalProduct({
                    ...localProduct!,
                    lowStockThreshold: parseFloat(e.target.value),
                  })
                }
              />
            </Fragment>
          )}
        {localProduct.isCompositeItem && (
          <Table aria-label="Example static collection table">
            <TableHeader>
              <TableColumn>Name</TableColumn>
              <TableColumn>Cost</TableColumn>
              <TableColumn>Quantity</TableColumn>
              <TableColumn>
                <Button
                  isIconOnly
                  color="primary"
                  variant="bordered"
                  onPress={() => setInvSelectorOpen(true)}
                >
                  <IoMdAdd />
                </Button>
              </TableColumn>
            </TableHeader>
            <TableBody>
              {invStore.list.map((item, key) => (
                <TableRow key={key}>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{toLocalCurrency(item.cost)}</TableCell>
                  <TableCell>
                    <Input
                      value={item.quantity.toString()}
                      onChange={(e) => {
                        let newQuantity = e.target.value;
                        if (isNaN(Number(newQuantity))) {
                          newQuantity = "0";
                        }
                        const updatedCompositeItems = invStore!.list.map(
                          (compItem) =>
                            compItem.id === item.id
                              ? {
                                  ...compItem,
                                  quantity: Number(newQuantity),
                                }
                              : compItem // Keep other items unchanged
                        );

                        invStore.setList(updatedCompositeItems);
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      isIconOnly
                      onPress={() => {
                        invStore.setList(
                          invStore.list.filter((i) => i.id !== item.id)
                        );
                      }}
                    >
                      <IoMdClose />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
        <MistDivider />
        Modifiers
        {modifiers.loading && <NormalLoader />}
        {modifiers.list.map((modifier) => (
          <div key={modifier._id}>
            <Checkbox
              isSelected={localProduct.modifiers.includes(modifier._id)}
              onValueChange={(e) => {
                if (e) {
                  setLocalProduct({
                    ...localProduct!,
                    modifiers: [...localProduct!.modifiers, modifier._id],
                  });
                } else {
                  setLocalProduct({
                    ...localProduct!,
                    modifiers: localProduct!.modifiers.filter(
                      (id) => id != modifier._id
                    ),
                  });
                }
              }}
            >
              {modifier.name}
            </Checkbox>
          </div>
        ))}
        <MistDivider />
        Item Apperance On PosScreen
        <span>Pick Color</span>
        <div className="flex flex-wrap gap-1">
          {MaterialColors.listColors.map((color) => (
            <MistColorButton
              color={color}
              onPress={() => {
                setLocalProduct({
                  ...localProduct!,
                  color,
                });
              }}
              selected={localProduct?.color == color}
            />
          ))}
        </div>
        <span>Pick Shape</span>
        <div className="flex flex-wrap gap-1">
          {MaterialColors.listIcons.map((svg) => (
            <MistIconButton
              color={localProduct.color}
              onPress={() => {
                setLocalProduct({
                  ...localProduct!,
                  shape: svg,
                });
              }}
              selected={localProduct?.shape == svg}
              svg={svg}
            />
          ))}
        </div>
        <Button
          color="primary"
          isLoading={productState.loading}
          onPress={() => productState.createProduct(localProduct)}
        >
          Create Item
        </Button>
      </div>
    </div>
  );
};
