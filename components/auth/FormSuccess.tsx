import React from "react";

interface FormSuccessProps {
  message: string | undefined;
}

const FormSuccess: React.FC<FormSuccessProps> = ({ message }) => {
  return (
    <div className="relative mb-4 rounded border border-green-400 bg-green-100 px-4 py-3 text-green-700">
      <span className="block sm:inline">{message}</span>
    </div>
  );
};

export default FormSuccess;
