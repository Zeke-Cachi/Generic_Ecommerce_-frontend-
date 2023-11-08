"use client";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import {
  useGlobalCart,
  useWindowHeight,
  useGlobalUser,
  useWindowWidth,
} from "@/app/CustomHooks";
import Link from "next/link";
import Button from "./Button";
import SearchBar from "./SearchBar";
import { auth } from "@/firebase";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

const Header = () => {
  const { state, totalAmount } = useGlobalCart();
  const { userData, logOut } = useGlobalUser();
  const checkHeight = useWindowHeight();
  const isResponsive = useWindowWidth();
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  return (
    <div
      className={`navbar ${
        checkHeight === 0 ? "h-32 bg-white" : "h-16 bg-white opacity-90"
      } sticky top-0 border-b-2 border-b-purple-800 px-4 flex justify-between transition-all z-50`}
    >
      {isResponsive && showSearchBar && <SearchBar />}
      <div>
        <Link href={"/"}>
          {checkHeight === 0 ? (
            <Image
              src="/site-logo.png"
              width={180}
              height={180}
              alt="site logo"
            />
          ) : (
            <Image
              src="/scroll-logo.png"
              width={50}
              height={50}
              alt="site logo"
              className="ms-8"
            />
          )}
        </Link>
      </div>

      {!isResponsive && <SearchBar />}

      <div className="flex items-center justify-center">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <div className="indicator">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              {/* THIS IS THE NUMBER IN THE CART ICON */}
              <span className="badge badge-sm indicator-item">
                {state.cart.length}
              </span>
            </div>
          </label>
          <div
            tabIndex={0}
            className="mt-3 z-[1] card card-compact dropdown-content w-52 bg-base-100 shadow"
          >
            <div className="card-body border rounded-xl border-gray-200 bg-gray-100">
              <span className="font-bold text-lg">
                {state.cart.length} Items
              </span>
              <span className="text-black">
                Subtotal:{" "}
                <span className="font-bold">${totalAmount.toFixed(2)}</span>{" "}
              </span>
              <div className="card-actions">
                <Link href="/cart" className="mx-auto">
                  <Button title={"View Cart"} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost avatar text-center">
            <div className="w-10 rounded-full">
              {userData.profileImg === "" ? (
                <FaUserAlt className="h-[1.5rem] w-[1.5rem]" />
              ) : (
                <Image
                  src={userData.profileImg}
                  height={200}
                  width={200}
                  alt="header profile picture"
                  className="h-[1.5rem] w-[1.5rem]"
                />
              )}
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              {auth.currentUser ? (
                <>
                  <Link href={"/profile"}>
                    <span>{auth.currentUser.displayName}`s</span>Profile
                  </Link>
                  {isResponsive ? (
                    <span onClick={() => setShowSearchBar(!showSearchBar)}>
                      Search
                    </span>
                  ) : null}
                  <button onClick={logOut}>Log Out</button>
                </>
              ) : (
                <>
                  <Link href={"/login"}>Login</Link>
                  <Link href={"/register"}>Register</Link>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
      <Toaster />
    </div>
  );
};

export default Header;
