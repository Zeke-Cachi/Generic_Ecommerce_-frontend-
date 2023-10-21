"use client";
import React, { useState, useEffect } from "react";
import { FaUserAlt, FaCamera } from "react-icons/fa";
import { storage } from "@/firebase";
import { useGlobalUser } from "@/app/Contexts/UserContext";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uuid } from "uuidv4";
import Image from "next/image";

const Profile = () => {
  const { userData, setUserData } = useGlobalUser();
  const [profileImage, setProfileImage] = useState<File | null>(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (profileImage === null) return console.log("didn´t work");
      const imageRef = ref(storage, `profileImg/${profileImage.name}${uuid()}`);
      await uploadBytes(imageRef, profileImage);
      const uploadURL = await getDownloadURL(imageRef);
      setUserData((prev) => ({ ...prev, profileImg: uploadURL }));
      alert("Image uploaded!");
    };
    uploadImage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profileImage]);

  const updateProfileImg = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileImage(() => e.target.files![0]);
  };

  return (
    <div className="p-4">
      <h2 className="text-[2.5rem] mb-8">My account</h2>
      <div className="w-1/2 border-xl flex flex-col items-center justify-between gap-8 px-4 mx-auto bg-purple-50 border border-purple-100">
        <div className="flex justify-between w-full p-8">
          <div className="flex gap-4 items-center relative">
            {userData.profileImg !== "" ? (
              <Image
                src={userData.profileImg}
                height={200}
                width={200}
                alt="Profile Picture"
                className="rounded-full border border-purple-200 h-24 w-24"
              />
            ) : (
              <FaUserAlt className="rounded-full border border-purple-200 h-24 w-24" />
            )}

            <label className="bg-purple-400 h-8 w-8 p-2 absolute top-[4.3rem] left-[4.3rem] z-50 cursor-pointer rounded-full">
              <input
                type="file"
                className="hidden"
                onChange={(e) => updateProfileImg(e)}
              />
              <FaCamera className="text-white" />
            </label>
            <div>
              <h3 className="text-[2rem]">
                {userData.displayName + " " + userData.lastname}
              </h3>
              <h6>{userData.email}</h6>
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
