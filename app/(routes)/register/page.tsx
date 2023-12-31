"use client";
import Link from "next/link";
import Button from "@/app/Components/Button";
import { UseGlobalUser } from "@/app/CustomHooks";
import { Toaster } from "react-hot-toast";
import FormWarnings from "@/app/Components/FormWarnings";
import { useState } from "react";

const Register = () => {
  const { handleInput, handleRegisterSubmit, userData, setUserData } =
    UseGlobalUser();

  const [clickedPwInput, setClickedPwInput] = useState(false);

  const checkTextInputValue = (
    input: string,
    inputType: "string" | "password"
  ) => {
    if (inputType === "string") {
      return /[0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(input);
    }
    if (inputType === "password" && input) {
      return input.length < 5;
    }
    if (inputType === "password" && input && input.length >= 5) {
      setClickedPwInput(false);
    }
  };

  return (
    <div
      className="hero min-h-[100vh] bg-purple-300"
      style={{ backgroundImage: "url(/register-img.jpg" }}
    >
      <div className="hero-overlay bg-opacity-60 grid place-items-center">
        <div className="hero-content p-0 lg:p-4 flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ms-12">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mt-8 lg:mt-0">
              Register now!
            </h1>
            <p className="py-6 px-2 lg:px-0 text-sm lg:text-base text-white">
              Join our thriving community of shoppers! Create your account and
              unlock a world of shopping delights. Enjoy exclusive access to
              deals, personalized recommendations, and a seamless checkout
              experience. Let`s get started on your exciting shopping adventure.
              Register now and be part of our dynamic marketplace!
            </p>
          </div>
          <form
            className="card flex-shrink-0 w-[80%] lg:w-full max-w-sm shadow-2xl bg-gray-100 mb-8"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) =>
              handleRegisterSubmit(e)
            }
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                {checkTextInputValue(userData.name, "string") ? (
                  <FormWarnings
                    message={
                      "The name cannot have numbers or special characters"
                    }
                  />
                ) : null}
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered bg-white"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Lastname</span>
                </label>
                {checkTextInputValue(userData.lastname, "string") ? (
                  <FormWarnings
                    message={
                      "The lastname cannot have numbers or special characters"
                    }
                  />
                ) : null}
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="text"
                  placeholder="lastname"
                  name="lastname"
                  className="input input-bordered bg-white"
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
                  className="input input-bordered bg-white"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                {clickedPwInput &&
                checkTextInputValue(userData.password!, "password") ? (
                  <FormWarnings
                    message={
                      "The password must be over 8 characters long and have a number or special character"
                    }
                  />
                ) : null}
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="password"
                  placeholder="password"
                  onFocus={() => setClickedPwInput(true)}
                  name="password"
                  className="input input-bordered bg-white"
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
                  className="input input-bordered bg-white"
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
