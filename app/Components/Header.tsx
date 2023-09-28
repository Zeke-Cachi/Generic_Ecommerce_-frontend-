"use client";
import React, { useContext } from "react";
import { FaUserAlt } from "react-icons/fa";
import Image from "next/image";
import { CartContext } from "../Contexts/CartContext";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Header = () => {
  const { state, totalAmount } = useContext(CartContext);
  const router = useRouter;

  return (
    <div className="navbar h-32 border-b-2 border-b-purple-800 px-4">
      <div className="flex-1">
        <Image src="/site-logo.png" width={180} height={180} alt="site logo" />
      </div>
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
                <Link
                  href="/cart"
                  className="btn btn-primary bg-purple-800 mx-auto text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800"
                >
                  View Cart
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost avatar text-center">
            <div className="w-10 pt-2">
              <FaUserAlt className="h-[1.5rem] w-[1.5rem]" />
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
