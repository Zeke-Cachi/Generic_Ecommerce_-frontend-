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
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "uuidv4";
import { storage } from "@/firebase";
import { useGlobalCart } from "./CartContext";

//--------------------------------- CREATE CONTEXT -------------------------------------------------------------//
export const UserContext = createContext<IUserContext>({
  userData: {
    _id: "",
    name: "",
    lastname: "",
    email: "",
    profileImg: "",
    cart: [],
    uploadedProducts: [],
  },
  setUserData: () => {},
  handleInput: () => {},
  handleRegisterSubmit: () => {},
  handleLogin: () => {},
  handlePasswordReset: () => {},
  updateProfileImg: () => {},
  logOut: () => {},
});

//--------------------------------- PROVIDER ------------------------------------------------------------------//
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //--------------------------------- HOOKS -------------------------------------------//
  const router = useRouter();
  const { initializeState } = useGlobalCart();
  const [userData, setUserData] = useState<UserData>({
    _id: "",
    name: "",
    lastname: "",
    email: "",
    profileImg: "",
    password: "",
    cart: [],
    uploadedProducts: [],
  });
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [checkProfilePicInUserData, setCheckProfilePicInUserData] =
    useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          const fetchUserAtPageLoad = await axios.get(
            `http://localhost:5500/users/getbyemail/${user.email}`
          );
          fetchUserAtPageLoad.data[0].cart.length > 0 &&
            (setUserData(() => fetchUserAtPageLoad.data[0]),
            initializeState(fetchUserAtPageLoad.data[0].cart, "cart"));
        } catch (error) {
          console.log(error);
        }
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const uploadImageToFirebase = async () => {
      if (profileImage === null) return null;
      const imageRef = ref(storage, `profileImg/${profileImage.name}${uuid()}`);
      await uploadBytes(imageRef, profileImage);
      const uploadURL = await getDownloadURL(imageRef);
      setUserData((prev) => ({ ...prev, profileImg: uploadURL }));
      setCheckProfilePicInUserData(true);
    };
    uploadImageToFirebase();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);

  useEffect(() => {
    const triggerUpdateProfilePic = async () => {
      if (userData.profileImg !== "") {
        const sendProfileImage = await axios.put(
          `http://localhost:5500/users/updateprofileimage/${userData._id}`,
          userData
        );
      }
    };
    triggerUpdateProfilePic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkProfilePicInUserData]);

  //--------------------------------- VARIOUS FUNCTIONS -------------------------------------------//
  const updateProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(() => e.target.files![0]);
  };

  function handleInput<T>(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setterFunction: React.Dispatch<React.SetStateAction<T>>
  ) {
    const { name, value } = e.target;
    setterFunction((prev) => ({ ...prev, [name]: value }));
  }

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

  //--------------------------------- RESET PASSWORD --------------------------------------------//
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

  //--------------------------------- LOGOUT --------------------------------------------//
  const logOut = async () => {
    try {
      await auth.signOut();
      setUserData({
        name: "",
        lastname: "",
        email: "",
        profileImg: "",
        password: "",
        cart: [],
        uploadedProducts: [],
      });
      toast.success("Succesfully logged out", { position: "bottom-center" });
    } catch (error) {
      console.error(error);
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
        updateProfileImg,
        logOut,
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
