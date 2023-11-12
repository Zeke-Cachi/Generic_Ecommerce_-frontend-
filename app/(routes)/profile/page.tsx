"use client";
import { FaUserAlt, FaCamera } from "react-icons/fa";
import { UseGlobalUser } from "@/app/CustomHooks";
import Image from "next/image";
import { BsFillBagXFill } from "react-icons/bs";
import Button from "@/app/Components/Button";
import CartCard from "@/app/Components/CartCard";
import { useRouter } from "next/navigation";
import H2Title from "@/app/Components/H2Title";

const Profile = () => {
  const { userData, updateProfileImg } = UseGlobalUser();
  const router = useRouter();
  const goToPostProduct = () => router.push("/products/post");

  return (
    <div className="p-4 bg-white">
      <H2Title title={"My account"} />
      <div className="w-[90vw] lg:w-1/2 border-xl flex flex-col items-center justify-between gap-8 px-4 pb-4 mx-auto mb-12 bg-purple-50 border border-purple-100">
        <div className="flex flex-col lg:flex-row justify-between w-full p-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center relative">
            {userData.profileImg !== "" ? (
              <Image
                src={userData.profileImg}
                height={200}
                width={200}
                alt="Profile Picture"
                className="rounded-full border border-purple-200 h-24 w-24 object-cover"
              />
            ) : (
              <FaUserAlt className="rounded-full border border-purple-200 h-24 w-24" />
            )}

            <label className="bg-purple-400 h-8 w-8 p-2 absolute top-[4.3rem] left-[4.3rem] z-10 cursor-pointer rounded-full">
              <input
                type="file"
                className="hidden"
                onChange={(e) => updateProfileImg(e)}
              />
              <FaCamera className="text-white" />
            </label>
            <div>
              <h3 className="text-[2rem] text-center lg:text-justify">
                {userData.name + " " + userData.lastname}
              </h3>
              <h6>{userData.email}</h6>
            </div>
          </div>
          <div className="flex flex-col gap-4 pt-5 justify-between items-center h-1/4">
            <h4 className="text-2xl text-center lg:text-justify">
              Amount of items on sale
            </h4>
            <h6 className="text-5xl font-bold text-purple-700 opacity-90">
              {userData.uploadedProducts.length}
            </h6>
          </div>
        </div>
      </div>

      <h2 className="text-[2.5rem] mb-8">My products for sale</h2>
      <div className="flex flex-col items-center mb-8">
        {userData.uploadedProducts === undefined ? (
          <div>
            <h3 className="text-[1.5rem] mb-8 text-center">
              You don`t have any products for sale
            </h3>
            <BsFillBagXFill className="mx-auto lg:w-36 lg:h-36 mb-8 text-purple-800" />
          </div>
        ) : (
          userData.uploadedProducts!.map((item) => (
            <CartCard
              item={item}
              key={item._id}
              showSecondaryBtn={false}
              extraStyling={"lg:w-3/4 grid-cols-3"}
            />
          ))
        )}
        <Button
          title="Post a product for sale"
          optionalStyle="mx-auto"
          passedFunction={goToPostProduct}
        />
      </div>
    </div>
  );
};

export default Profile;
