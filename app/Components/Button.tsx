"use client";
import React from "react";
import { ButtonProps } from "@/typesAndInterfaces";
import { useRouter } from "next/navigation";

const Button: React.FC<ButtonProps> = ({
  passedFunctionWithId,
  passedFunctionWithItem,
  title,
  _id,
  item,
  optionalStyle,
}) => {
  const router = useRouter();
  const checkIfUserIsLoggedIn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    if (passedFunctionWithId && _id) {
      passedFunctionWithId(_id);
    }

    if (passedFunctionWithItem && item) {
      passedFunctionWithItem(item);
    }
  };

  return (
    <button
      onClick={
        passedFunctionWithId || passedFunctionWithItem
          ? (e) => checkIfUserIsLoggedIn(e)
          : undefined
      }
      className={`${optionalStyle} btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800`}
    >
      {title}
    </button>
  );
};

export default Button;
