import React from "react";
import { FaUserAlt } from "react-icons/fa";

const Profile = () => {
  return (
    <div className="p-4">
      <h2 className="text-[2.5rem] mb-8">My account</h2>
      <div className="w-1/2 border-xl flex flex-col items-center justify-between gap-8 px-4 mx-auto bg-purple-50 border border-purple-100">
        <div className="flex justify-between w-full p-8">
          <div className="flex gap-4 items-center">
            <FaUserAlt className="rounded-full border border-purple-200 h-24 w-24" />
            <div>
              <h3 className="text-[2rem]">Pepito Perez</h3>
              <h6>pepitoperez@gmail.com</h6>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-5 justify-between items-start h-1/4">
            <h6>
              <span className="font-bold text-purple-500">Address</span>: 2154
              Evergreen Av., Springfield, Texas
            </h6>
            <h6>
              <span className="font-bold text-purple-500">Phone number</span>:
              +1549875698
            </h6>
          </div>
        </div>
        <button className="btn btn-primary bg-purple-800 mx-auto text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800 mb-8">
          Edit personal information
        </button>
      </div>
    </div>
  );
};

export default Profile;
