"use client";
import React from "react";
import { ButtonProps } from "@/typesAndInterfaces";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";

const Button: React.FC<ButtonProps> = ({
  passedFunction,
  title,
  _id,
  optionalStyle,
}) => {
  const router = useRouter();
  const checkIfUserIsLoggedIn = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (!auth.currentUser) return router.push("/login");
    passedFunction && passedFunction(_id);
  };
  return (
    <button
      onClick={(e) => checkIfUserIsLoggedIn(e)}
      className={`${optionalStyle} btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800`}
    >
      {title}
    </button>
  );
};

export default Button;
