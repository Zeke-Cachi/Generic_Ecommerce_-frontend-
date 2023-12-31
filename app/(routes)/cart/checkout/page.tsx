"use client";
import { UseGlobalCart } from "@/app/CustomHooks";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
import Button from "@/app/Components/Button";
import H2Title from "@/app/Components/H2Title";

const Checkout = () => {
  const { state, totalAmount, clearCart } = UseGlobalCart();
  const router = useRouter();

  const handlePurchase = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Your purchase is completed!",
      showConfirmButton: false,
      timer: 1500,
      backdrop: true,
    });
    setTimeout(() => {
      clearCart();
      router.push("/");
    }, 800);
  };

  return (
    <div className="w-full flex justify-center bg-white">
      <div className="p-4 mt-12 w-[90%] lg:w-[70%]  bg-gray-100 border-gray-200 rounded-2xl flex flex-col justify-between">
        <H2Title title={"Checkout"} />
        <div>
          <div className="grid grid-cols-3 text-center mb-4 border-b-2 border-b-purple-400">
            <h6 className="font-bold text-purple-400">Item</h6>
            <h6 className="font-bold text-purple-400">Unitary price</h6>
            <h6 className="font-bold text-purple-400">Quantity</h6>
          </div>
          {state.cart.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-3 text-center odd:bg-purple-100 min-h-16"
            >
              <p className="flex items-center justify-center">
                {item.title.length > 30
                  ? item.title.slice(0, 30) + "..."
                  : item.title}
              </p>
              <p className="flex items-center justify-center">
                ${item.price} + tax
              </p>
              <p className="flex items-center justify-center">
                {item.quantity}
              </p>
            </div>
          ))}
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-0 items-center lg:items-end justify-between mt-8">
          <h3
            className={`${
              totalAmount.toFixed(2).length > 4
                ? "text-[1.4rem]"
                : "text-[2rem]"
            }  lg:text-[2.5rem] mb-4 lg:mb-0`}
          >
            Total: ${totalAmount.toFixed(2)} + tax
          </h3>
          <Button passedFunction={handlePurchase} title={"COMPLETE PURCHASE"} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
