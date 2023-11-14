"use client";
import { createContext, useState, useEffect } from "react";
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
import { UseGlobalCart } from "@/app/CustomHooks";
import { SERVER_URL } from "../functions";

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
  handleProductCreation: () => {},
});

//--------------------------------- PROVIDER ------------------------------------------------------------------//
const UserProvider = ({ children }: { children: React.ReactNode }) => {
  //--------------------------------- HOOKS -------------------------------------------//
  const router = useRouter();
  const { initializeState, clearCart, storeNewProduct } = UseGlobalCart();
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
            `${SERVER_URL}/users/getbyemail/${user.email}`
          );
          setUserData(() => fetchUserAtPageLoad.data[0]),
            initializeState(fetchUserAtPageLoad.data[0].cart, "cart");
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
          `${SERVER_URL}/users/updateprofileimage/${userData._id}`,
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

  const doubleCheckPw = (userData: UserData): number => {
    if (userData.password !== userData.repeatPassword) {
      return 1;
    }
    if (!/[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(userData.password!)) {
      return 2;
    } else {
      return 3;
    }
  };

  //THIS FUNCTION IS HERE INSTEAD OF CARTCONTEXT, BECAUSE WE NEED ACCESS TO THE USERDATA STATE
  const handleProductCreation = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (userData._id) {
      const productPayload = { ...storeNewProduct, userId: userData._id };
      try {
        const response = await axios.post(
          `${SERVER_URL}/products`,
          productPayload
        );
        setUserData((prev) => ({
          ...prev,
          uploadedProducts: [...response.data[1].uploadedProducts],
        }));
        toast.success("Product successfully uploaded!", {
          position: "bottom-center",
        });
        router.push("/profile");
      } catch (error) {
        console.error(error);
        toast.error("There was an error. Try again", {
          position: "bottom-center",
        });
      }
    }
  };

  //--------------------------------- REGISTER FORM ------------------------------------//
  const handleRegisterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const checkPwResult: number = doubleCheckPw(userData);
    if (checkPwResult === 1) {
      return toast.error("Passwords do not match");
    }
    if (checkPwResult === 2) {
      return toast.error("Password doesn´t have numbers or special characters");
    }
    try {
      const postData = { ...userData };
      delete postData.password;
      delete postData.repeatPassword;
      delete postData._id;
      const createUser = await axios.post(
        `${SERVER_URL}/users/create`,
        postData
      );
      setUserData(() => createUser.data);
      toast.success("Successfully registered!", {
        position: "bottom-center",
      });
      setUserData((prev) => ({ ...prev, password: "" }));
      if (createUser) {
        const userCreationRequest = await createUserWithEmailAndPassword(
          auth,
          userData.email,
          userData.password!
        );
      }
      auth.currentUser
        ? await updateProfile(auth.currentUser, {
            displayName: userData.name,
          })
        : console.log("there was no user!");
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error(
        "There were errors in the data you provided. Please try again"
      );
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
        `${SERVER_URL}/users/getbyemail/${userData.email}`
      );
      setUserData(fetchUserData.data[0]);
      toast.success("Successfully logged in!", { position: "bottom-center" });
      router.push("/");
    } catch (error) {
      console.error(error);
      toast.error("Incorrect data. Please try again", {
        position: "bottom-center",
      });
    }
  };

  //--------------------------------- RESET PASSWORD --------------------------------------------//
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const sendLink = await sendPasswordResetEmail(auth, userData.email);
      toast.success("Link sent! check your email");
      router.push("/login");
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
      clearCart();
      toast.success("Succesfully logged out", { position: "bottom-center" });
      router.push("/");
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
        handleProductCreation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
