import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const opt = {
  position: "top-center",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  }

const GenericAlert = {
  success: (message) => {
    toast.success(message ,opt);
  },
  error: (message) => {
    toast.error(message,opt);
  },
  info: (message) => {
    toast.info(message,opt);
  },
  warning: (message) => {
    toast.warning(message,opt);
  },
};

export default GenericAlert;
