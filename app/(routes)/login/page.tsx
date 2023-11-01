"use client";
import Link from "next/link";
import Button from "@/app/Components/Button";
import { useGlobalUser } from "../../CustomHooks";
import { Toaster } from "react-hot-toast";

const Login = () => {
  const { handleInput, setUserData, handleLogin } = useGlobalUser();

  return (
    <div
      className="hero h-[90vh]"
      style={{ backgroundImage: "url(/login-img.webp" }}
    >
      <div className="hero-overlay bg-opacity-60 grid place-items-center">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left lg:ms-12">
            <h1 className="text-5xl font-bold text-white">Login now!</h1>
            <p className="py-6 text-white">
              Welcome back to our vibrant marketplace! Dive into a world of
              endless choices and seamless shopping. Discover curated
              collections, exclusive deals, and personalized recommendations
              tailored just for you. Let`s make every click count. Log in now to
              embark on your shopping journey with us!
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-100">
            <form className="card-body" onSubmit={(e) => handleLogin(e)}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  onChange={(e) => handleInput(e, setUserData)}
                  type="text"
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
                <label className="label">
                  <Link
                    href="/resetpassword"
                    className="label-text-alt link link-hover"
                  >
                    Forgot Password?
                  </Link>
                  <Link
                    href="/register"
                    className="label-text-alt link link-hover"
                  >
                    Haven´t registered yet?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <Button title={"Login"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
