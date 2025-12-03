"use client";
import { FC, useEffect, useState } from "react";
import { TCategory } from "@/types/category-t";
import { IoIosArrowBack } from "react-icons/io";
import { MaterialColors } from "@/utils/colors";
import { useNavigation } from "@/stores/use-navigation";
import { useCategoriesStore } from "@/stores/categories-store";
import { Button, Input, Navbar, NavbarBrand } from "@heroui/react";
import { MistColorButton } from "@/components/buttons/color-button";

export const EditCategoryNav: FC = () => {
  const navigation = useNavigation();
  const categories = useCategoriesStore();
  const [localCategory, setLocalCategory] = useState<TCategory | null>();
  const initializeLocalCategory = (categoryProp?: TCategory | null) => {
    if (categoryProp) {
      setLocalCategory({ ...categoryProp });
    } else {
      setLocalCategory(null);
    }
  };

  useEffect(() => {
    initializeLocalCategory(categories.focusedCategory);
  }, [categories.focusedCategory]);
  return (
    <div className="w-full flex items-center justify-center">
      {localCategory == null && "Something went wrong"}
      {localCategory && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">Update Category</p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localCategory.name}</div>
          <Input
            label="Category Name"
            value={localCategory.name}
            onChange={(e) =>
              setLocalCategory({
                ...localCategory!,
                name: e.target.value,
              })
            }
          />
          <span>Pick Color</span>
          <div className="flex flex-wrap gap-1">
            {MaterialColors.listColors.map((color) => (
              <MistColorButton
                color={color}
                onPress={() => {
                  setLocalCategory({
                    ...localCategory!,
                    color,
                  });
                }}
                selected={localCategory?.color == color}
              />
            ))}
          </div>
          <Button
            color="primary"
            isLoading={categories.loading}
            onPress={() => categories.updateCategory(localCategory)}
          >
            Update Category
          </Button>
        </div>
      )}
    </div>
  );
};
