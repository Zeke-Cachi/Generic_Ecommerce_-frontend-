import React from "react";
import { ButtonProps } from "@/typesAndInterfaces";

const Button: React.FC<ButtonProps> = ({
  passedFunction,
  title,
  id,
  optionalStyle,
}) => {
  return (
    <button
      onClick={() => passedFunction && passedFunction(id)}
      className={`${optionalStyle} btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800`}
    >
      {title}
    </button>
  );
};

export default Button;
