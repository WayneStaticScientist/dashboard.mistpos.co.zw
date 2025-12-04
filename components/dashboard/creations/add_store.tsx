"use client";
import { FC, useState } from "react";
import { TCompany } from "@/types/company-t";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { Button, Input, Navbar, NavbarBrand } from "@heroui/react";

export const AddStoreNav: FC = () => {
  const stores = useCompanyStore();
  const navigation = useNavigation();
  const [localStore, setLocalStore] = useState<TCompany>({
    _id: "",
    owner: "",
    name: "",
    email: "",
    hadTrialMode: false,
  });

  return (
    <div className="w-full flex items-center justify-center">
      {localStore == null && "Something went wrong"}
      {localStore && (
        <div className=" max-w-2xl w-full gap-4 flex flex-col">
          <Navbar>
            <NavbarBrand
              className=" cursor-pointer select-none"
              onClick={() => navigation.back()}
            >
              <IoIosArrowBack />
              <p className="font-bold text-inherit ml-3">Create Store</p>
            </NavbarBrand>
          </Navbar>
          <div className="font-bold text-xl"> {localStore.name}</div>
          <Input
            label="Store Name"
            value={localStore.name}
            onChange={(e) =>
              setLocalStore({
                ...localStore!,
                name: e.target.value,
              })
            }
          />
          <Button
            color="primary"
            isLoading={stores.loading}
            onPress={() => stores.createcompany(localStore)}
          >
            Create Store
          </Button>
        </div>
      )}
    </div>
  );
};
