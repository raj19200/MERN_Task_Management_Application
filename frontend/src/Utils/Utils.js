import { toast } from "react-toastify";

export const notify = (message, type) => {
  toast[type](message);
};

export const API_URL = "http://127.0.0.1:8080";
