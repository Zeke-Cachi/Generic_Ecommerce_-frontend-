"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { IUserContext, UserData } from "@/typesAndInterfaces";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import { auth } from "@/firebase";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

//--------------------------------- CREATE CONTEXT -------------------------------------------------------------//
export const UserContext = createContext<IUserContext>({
  userData: {
    _id: "",
    name: "",
    lastname: "",
    email: "",
    profileImg: "",
  },
  setUserData: () => {},
  handleInput: () => {},
  handleRegisterSubmit: () => {},
  handleLogin: () => {},
  handlePasswordReset: () => {},
});

//--------------------------------- PROVIDER ------------------------------------------------------------------//
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //--------------------------------- HOOKS -------------------------------------------//
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    _id: "",
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

  useEffect(() => {
    console.log(userData);
  }, [userData]);
  //--------------------------------- REGISTER FORM ------------------------------------//
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (userData.password) {
        const userCreationRequest = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password
        );
      }
      auth.currentUser
        ? await updateProfile(auth.currentUser, {
            displayName: userData.name,
          })
        : console.log("there was no user!");
      const postData = { ...userData };
      delete postData.password;
      delete postData._id;
      const createUser = await axios.post(
        "http://localhost:5500/users/create",
        postData
      );
      setUserData(() => createUser.data);
      toast.success("Successfully registered!", { position: "bottom-center" });
      setUserData((prev) => ({ ...prev, password: "" }));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  //--------------------------------- LOGIN FORM --------------------------------------------//
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const signIn = await signInWithEmailAndPassword(
        auth,
        userData.email,
        userData.password!
      );
      const fetchUserData = await axios.get(
        `http://localhost:5500/users/getbyemail/${userData.email}`
      );
      setUserData(fetchUserData.data[0]);
      toast.success("Successfully logged in!", { position: "bottom-center" });
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sendLink = await sendPasswordResetEmail(auth, userData.email);
      toast.success("Link sent! check your email");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong... Try again");
    }
  };

  //--------------------------------------------------------------------------------------//
  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        handleInput,
        handleRegisterSubmit,
        handleLogin,
        handlePasswordReset,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

//--------------------------------------------------------------------------------------//
export const useGlobalUser = () => {
  return useContext(UserContext);
};
