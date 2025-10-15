import React, { useEffect, useState } from "react";
import { CheckCircle, X, AlertCircle, Info } from "lucide-react";

const Toast = ({ 
  message, 
  type = "success", 
  duration = 5000, 
  onClose, 
  isVisible = true 
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        setTimeout(() => onClose?.(), 300); // Wait for animation to complete
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => onClose?.(), 300);
  };

  const getToastStyles = () => {
    switch (type) {
      case "success":
        return {
          bg: "bg-gradient-to-r from-emerald-500 to-green-600",
          border: "border-emerald-400/30",
          icon: <CheckCircle className="w-5 h-5 text-white" />,
          iconBg: "bg-emerald-500/20"
        };
      case "error":
        return {
          bg: "bg-gradient-to-r from-red-500 to-red-600",
          border: "border-red-400/30",
          icon: <AlertCircle className="w-5 h-5 text-white" />,
          iconBg: "bg-red-500/20"
        };
      case "info":
        return {
          bg: "bg-gradient-to-r from-blue-500 to-blue-600",
          border: "border-blue-400/30",
          icon: <Info className="w-5 h-5 text-white" />,
          iconBg: "bg-blue-500/20"
        };
      default:
        return {
          bg: "bg-gradient-to-r from-gray-500 to-gray-600",
          border: "border-gray-400/30",
          icon: <Info className="w-5 h-5 text-white" />,
          iconBg: "bg-gray-500/20"
        };
    }
  };

  const styles = getToastStyles();

  if (!show) return null;

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right duration-300">
      <div className={`
        ${styles.bg} 
        ${styles.border}
        border 
        rounded-lg 
        shadow-lg 
        backdrop-blur-sm 
        p-4 
        min-w-[300px] 
        max-w-[400px]
        transform 
        transition-all 
        duration-300
        ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      `}>
        <div className="flex items-center gap-3">
          <div className={`${styles.iconBg} p-2 rounded-full`}>
            {styles.icon}
          </div>
          <div className="flex-1">
            <p className="text-white font-semibold text-sm">
              {type === "success" ? "Success!" : type === "error" ? "Error!" : "Info"}
            </p>
            <p className="text-white/90 text-sm mt-1">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors duration-200 p-1"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;
