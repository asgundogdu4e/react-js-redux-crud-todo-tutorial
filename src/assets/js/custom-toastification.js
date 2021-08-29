import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const showToast = (message, time) => {
  toast(message, {
    position: "top-right",
    autoClose: time || 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  });
};

export { showToast, ToastContainer };
