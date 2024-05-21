import React from "react";

interface FormErrorProps {
  message: string | undefined;
}

const FormError: React.FC<FormErrorProps> = ({ message }) => {
  return (
    <div className="relative mb-4 rounded border border-red-400 bg-red-100 px-4 py-3 text-red-700">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default FormError;
