/* eslint-disable react/prop-types */
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const toastStyles = {
  container: {
    fontFamily: "Arial, sans-serif",
  },
  toast: {
    borderRadius: "8px",
    padding: "16px",
    fontSize: "16px",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  },
  progress: {
    backgroundColor: "#00c851",
  },
  success: {
    backgroundColor: "#28a745",
    boxShadow: "0 4px 8px rgba(40, 167, 69, 0.3)",
  },
  error: {
    backgroundColor: "#dc3545",
    boxShadow: "0 4px 8px rgba(220, 53, 69, 0.3)",
  },
  warning: {
    backgroundColor: "#ffc107",
    color: "#333",
    boxShadow: "0 4px 8px rgba(255, 193, 7, 0.3)",
  },
  info: {
    backgroundColor: "#17a2b8",
    boxShadow: "0 4px 8px rgba(23, 162, 184, 0.3)",
  },
};

// Toast container with inline styling
const Toast = ({ position = "top-right", autoClose = 3000 }) => (
  <ToastContainer
    position={position}
    autoClose={autoClose}
    hideProgressBar={false}
    closeOnClick
    pauseOnFocusLoss
    draggable
    pauseOnHover
    style={toastStyles.container}
    toastStyle={(toastType) => {
      switch (toastType) {
        case "success":
          return { ...toastStyles.toast, ...toastStyles.success };
        case "error":
          return { ...toastStyles.toast, ...toastStyles.error };
        case "warning":
          return { ...toastStyles.toast, ...toastStyles.warning };
        case "info":
          return { ...toastStyles.toast, ...toastStyles.info };
        default:
          return toastStyles.toast;
      }
    }}
    progressStyle={toastStyles.progress}
  />
);

// Helper functions to trigger different types of toasts
const showToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  warn: (message) => toast.warn(message),
  info: (message) => toast.info(message),
  default: (message) => toast(message),
};

export { Toast, showToast };
