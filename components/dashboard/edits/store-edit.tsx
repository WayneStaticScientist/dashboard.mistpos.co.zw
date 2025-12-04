"use client";
import { TCompany } from "@/types/company-t";
import { FC, useEffect, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigation } from "@/stores/use-navigation";
import { useCompanyStore } from "@/stores/companies-store";
import { Button, Input, Navbar, NavbarBrand } from "@heroui/react";

export const EditStoreNav: FC = () => {
  const stores = useCompanyStore();
  const navigation = useNavigation();
  const [localStore, setLocalStore] = useState<TCompany | null>();
  const initializeLocalStore = (storeProp?: TCompany | null) => {
    if (storeProp) {
      setLocalStore({ ...storeProp });
    } else {
      setLocalStore(null);
    }
  };

  useEffect(() => {
    initializeLocalStore(stores.focusedCompany);
  }, [stores.focusedCompany]);
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
              <p className="font-bold text-inherit ml-3">Update Store</p>
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
            onPress={() => stores.updatecompany(localStore)}
          >
            Update Store
          </Button>
        </div>
      )}
    </div>
  );
};
