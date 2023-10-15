"use client";
import Link from "next/link";
import React, { useState } from "react";
import { RegisterData } from "@/typesAndInterfaces";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase";

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    lastname: "",
    email: "",
    password: "",
    repeatedPassword: "",
  });

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const userCreationRequest = await createUserWithEmailAndPassword(
        auth,
        registerData.email,
        registerData.password
      );
      console.log(userCreationRequest);
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
                  onChange={handleInput}
                  name="name"
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                  onChange={handleInput}
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
                <button
                  type="submit"
                  className={`btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800`}
                >
                  Register
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
