import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl">
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
