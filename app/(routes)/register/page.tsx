"use client";
import Link from "next/link";
import React, { useState } from "react";
import { UserData } from "@/typesAndInterfaces";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import Button from "@/app/Components/Button";
import { useGlobalUser } from "@/app/Contexts/UserContext";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Register = () => {
  const router = useRouter();

  const { handleInput, userData, setUserData } = useGlobalUser();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            displayName: userData.displayName,
          })
        : console.log("there was no user!");
      toast.success("Successfully registered!", { position: "bottom-center" });
      setUserData((prev) => ({ ...prev, password: "" }));
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      className="hero h-[90vh]"
      style={{ backgroundImage: "url(/register-img.jpg" }}
    >
      <div className="hero-overlay bg-opacity-60 grid place-items-center">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ms-12">
            <h1 className="text-5xl font-bold text-white">Register now!</h1>
            <p className="py-6 text-white">
              Join our thriving community of shoppers! Create your account and
              unlock a world of shopping delights. Enjoy exclusive access to
              deals, personalized recommendations, and a seamless checkout
              experience. Let`s get started on your exciting shopping adventure.
              Register now and be part of our dynamic marketplace!
            </p>
          </div>
          <form
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-100"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => handleSubmit(e)}
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  name="displayName"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Lastname</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="email"
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="password"
                  placeholder="password"
                  name="password"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Repeat password</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="password"
                  placeholder="repeat password"
                  name="repeatPassword"
                  className="input input-bordered"
                />
                <label className="label">
                  <Link
                    href="/login"
                    className="label-text-alt link link-hover"
                  >
                    Already registered? <span className="italic">Login</span>
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <Button title={"Register"} />
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Register;
