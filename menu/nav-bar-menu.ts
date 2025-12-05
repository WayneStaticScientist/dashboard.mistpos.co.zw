import { IconType } from "react-icons";
import { ImHistory } from "react-icons/im";
import { LuFactory } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
import { FiInfo, FiShare } from "react-icons/fi";
import { IoReceiptOutline } from "react-icons/io5";
import { AiOutlineProduct } from "react-icons/ai";
import { HiOutlineVariable } from "react-icons/hi";
import { BiCategory, BiExport, BiPurchaseTag } from "react-icons/bi";
import { FaAmazonPay, FaChartBar, FaRegUser } from "react-icons/fa";
import {
  MdAvTimer,
  MdOutlineCountertops,
  MdOutlineDiscount,
  MdOutlineHelpOutline,
  MdOutlineInventory2,
  MdOutlineSummarize,
} from "react-icons/md";
import { RiStockLine, RiStore2Line } from "react-icons/ri";
import { TbMoneybag, TbTaxEuro } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { VscDiffModified } from "react-icons/vsc";
import { WiDayLightWind } from "react-icons/wi";
export type NavBarItem = {
  name: string;
  page: string;
  Icon: IconType;
  children?: NavBarItem[];
};
export const NavBarMenu: {
  group: string;
  children: NavBarItem[];
}[] = [
  {
    group: "Reports",
    children: [
      {
        name: "Sales Summary",
        page: "#",
        children: [
          {
            name: "Summary",
            page: "main",
            Icon: MdOutlineSummarize,
          },
          {
            name: "Daily Sales",
            page: "dailySales",
            Icon: WiDayLightWind,
          },
          {
            name: "Sales By Employee",
            page: "employeeSales",
            Icon: GrUserWorker,
          },
          {
            name: "Sales By Payment",
            page: "paymentSales",
            Icon: FaAmazonPay,
          },
          {
            name: "Shifts",
            page: "shifts",
            Icon: MdAvTimer,
          },
        ],
        Icon: FaChartBar,
      },
      {
        name: "Receits",
        page: "receits",
        Icon: IoReceiptOutline,
      },
      {
        name: "Items",
        page: "#",
        Icon: TiShoppingCart,
        children: [
          {
            name: "Products",
            page: "products",
            Icon: AiOutlineProduct,
          },
          {
            name: "Categories",
            page: "categories",
            Icon: BiCategory,
          },
          {
            name: "Modifiers",
            page: "modifiers",
            Icon: VscDiffModified,
          },
          {
            name: "Discounts",
            page: "discounts",
            Icon: MdOutlineDiscount,
          },
        ],
      },
    ],
  },
  {
    group: "Inventory",
    children: [
      {
        name: "Advanced Inventory",
        page: "advancedInventory",
        Icon: MdOutlineInventory2,
        children: [
          {
            name: "Purchase Orders",
            page: "po",
            Icon: BiPurchaseTag,
          },
          {
            name: "Stock Adjustments",
            page: "sa",
            Icon: RiStockLine,
          },
          {
            name: "Suppliers",
            page: "su",
            Icon: GrUserWorker,
          },
          {
            name: "Transfer Orders",
            page: "ta",
            Icon: FiShare,
          },
          {
            name: "Inventory Counts",
            page: "ic",
            Icon: MdOutlineCountertops,
          },
          {
            name: "Productions",
            page: "productions",
            Icon: LuFactory,
          },
          {
            name: "Inventory History",
            page: "ih",
            Icon: ImHistory,
          },
          {
            name: "Inventory Valuation",
            page: "iv",
            Icon: HiOutlineVariable,
          },
          {
            name: "Export/Import Products",
            page: "eoi-products",
            Icon: BiExport,
          },
        ],
      },
    ],
  },
  {
    group: "Company",
    children: [
      {
        name: "Employees",
        page: "employees",
        Icon: GrUserWorker,
      },
      {
        name: "Customers",
        page: "customers",
        Icon: FaRegUser,
      },
      {
        name: "Stores",
        page: "stores",
        Icon: RiStore2Line,
      },
      {
        name: "Rates",
        page: "rates",
        Icon: TbMoneybag,
      },
      {
        name: "Taxs",
        page: "taxs",
        Icon: TbTaxEuro,
      },
    ],
  },
  {
    group: "Info",
    children: [
      {
        name: "Help And Support",
        page: "#",
        Icon: MdOutlineHelpOutline,
      },
      {
        name: "About",
        page: "#",
        Icon: FiInfo,
      },
    ],
  },
];
