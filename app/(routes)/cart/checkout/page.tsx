"use client";
import { useContext } from "react";
import { CartContext } from "@/app/Contexts/CartContext";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const Checkout = () => {
  const { state, totalAmount, clearCart } = useContext(CartContext);
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
    <div className="w-full h-[90vw] flex justify-center">
      <div className="p-4 mt-12 w-[70%] h-[40%] bg-gray-100 border-gray-200 rounded-2xl flex flex-col justify-between">
        <h2 className="text-[2.5rem]">Checkout</h2>
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
        <div className="flex items-end justify-between mt-4">
          <h3 className="text-[2.5rem]">
            Total: ${totalAmount.toFixed(2)} + tax
          </h3>
          <button
            onClick={handlePurchase}
            className="btn btn-primary bg-purple-800 text-white hover:bg-white hover:text-purple-800 hover:border-2 hover:border-purple-800"
          >
            Complete purchase
          </button>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
