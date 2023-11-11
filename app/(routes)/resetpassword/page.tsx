"use client";
import { Toaster } from "react-hot-toast";
import Button from "@/app/Components/Button";
import { useGlobalUser } from "@/app/CustomHooks";

const ResetPassword = () => {
  const { setUserData, handleInput, handlePasswordReset } = useGlobalUser();

  return (
    <div
      className="hero h-[90vh]"
      style={{ backgroundImage: "url(/reset-pw-bg.jpg)" }}
    >
      <div className="hero-overlay bg-opacity-60 grid place-items-center">
        <div className="hero-content flex-col w-[20rem] lg:w-auto">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-8">
              Reset your password
            </h1>
            <p className="text-md font-bold text-white mb-8 opacity-70">
              Enter your email address, and then check your mail for the
              password reset link
            </p>
          </div>
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-100">
            <form
              className="card-body"
              onSubmit={(e) => handlePasswordReset(e)}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  onChange={(e) => handleInput(e, setUserData)}
                  placeholder="email"
                  name="email"
                  className="input input-bordered"
                />
              </div>
              <div className="form-control mt-6">
                <Button title={"Reset password"} />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default ResetPassword;
