import toast from "react-hot-toast";
export const success = (message: string) => {
  toast.success(message);
};
export const errorToast = (message: string) => {
  toast.error(message);
};
