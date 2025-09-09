import React, { createContext, useContext, useState, useCallback } from "react";

const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, ...toast }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, toast.duration || 3000); // default 3s
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-6 right-6 flex flex-col space-y-3 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white
              ${t.type === "success" ? "bg-green-600" : ""}
              ${t.type === "error" ? "bg-red-600" : ""}
              ${t.type === "info" ? "bg-blue-600" : ""}
              ${t.type === "warning" ? "bg-yellow-600 text-black" : ""}`}
          >
            <p>{t.title}</p>
            {t.description && <p className="text-xs opacity-80">{t.description}</p>}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const { addToast } = useContext(ToastContext);
  return {
    toast: ({ title, description, type = "info", duration }) =>
      addToast({ title, description, type, duration }),
  };
};

// ✅ default export for shortcut usage
export const toast = ({ title, description, type, duration }) => {
  console.warn(
    "⚠️ Make sure you wrap your app in <ToastProvider> for toast() to work."
  );
};
