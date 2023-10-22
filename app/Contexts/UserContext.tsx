"use client";
import { createContext, useContext, useState } from "react";
import { IUserContext, UserData } from "@/typesAndInterfaces";

export const UserContext = createContext<IUserContext>({
  userData: {
    name: "",
    lastname: "",
    email: "",
    profileImg: "",
  },
  setUserData: () => {},
  handleInput: () => {},
});

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [userData, setUserData] = useState<UserData>({
    name: "",
    lastname: "",
    email: "",
    profileImg: "",
    password: "",
  });

  function handleInput<T>(
    e: React.ChangeEvent<HTMLInputElement>,
    setterFunction: React.Dispatch<React.SetStateAction<T>>
  ) {
    const { name, value } = e.target;
    setterFunction((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <UserContext.Provider value={{ userData, setUserData, handleInput }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useGlobalUser = () => {
  return useContext(UserContext);
};
