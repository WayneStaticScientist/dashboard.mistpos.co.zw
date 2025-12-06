import { IconType } from "react-icons";
import { FiShare } from "react-icons/fi";
import { ImHistory } from "react-icons/im";
import { LuFactory } from "react-icons/lu";
import { GrUserWorker } from "react-icons/gr";
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
  MdOutlinePayment,
  MdOutlineSummarize,
} from "react-icons/md";
import { RiStockLine, RiStore2Line } from "react-icons/ri";
import { TbMoneybag, TbTaxEuro } from "react-icons/tb";
import { TiShoppingCart } from "react-icons/ti";
import { VscDiffModified } from "react-icons/vsc";
import { WiDayLightWind } from "react-icons/wi";
import { IoIosLogOut } from "react-icons/io";
export type NavBarItem = {
  name: string;
  page: string;
  Icon: IconType;
  subscriptionLevels?: string[];
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
            page: "po",
            Icon: BiPurchaseTag,
            name: "Purchase Orders",
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Stock Adjustments",
            page: "sa",
            Icon: RiStockLine,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Suppliers",
            page: "su",
            Icon: GrUserWorker,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Transfer Orders",
            page: "ta",
            Icon: FiShare,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Inventory Counts",
            page: "ic",
            Icon: MdOutlineCountertops,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Productions",
            page: "productions",
            Icon: LuFactory,
            subscriptionLevels: ["enterprise", "trial"],
          },
          {
            name: "Inventory History",
            page: "ih",
            Icon: ImHistory,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Inventory Valuation",
            page: "iv",
            Icon: HiOutlineVariable,
            subscriptionLevels: ["pro", "enterprise", "trial"],
          },
          {
            name: "Export/Import Products",
            page: "eoi-products",
            Icon: BiExport,
            subscriptionLevels: ["pro", "enterprise", "trial"],
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
        subscriptionLevels: ["pro", "enterprise", "trial", "basic"],
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
        subscriptionLevels: ["pro", "enterprise", "trial", "basic"],
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
      {
        name: "Payment Gateways",
        page: "payments",
        Icon: MdOutlinePayment,
      },
      {
        name: "Subscriptions",
        page: "subscriptions",
        Icon: FaAmazonPay,
      },
    ],
  },
  {
    group: "Info",
    children: [
      {
        name: "Help And Support",
        page: "help",
        Icon: MdOutlineHelpOutline,
      },
      {
        name: "Logout",
        page: "logout",
        Icon: IoIosLogOut,
      },
    ],
  },
];
