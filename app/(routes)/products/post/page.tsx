"use client";
import Button from "@/app/Components/Button";
import { Toaster } from "react-hot-toast";
import { UseGlobalUser, UseGlobalCart } from "@/app/CustomHooks";

const PostProduct = () => {
  const { setStoreNewProduct, updateProductImg } = UseGlobalCart();

  const { handleInput, handleProductCreation } = UseGlobalUser();

  return (
    <div
      className="hero h-[100vh] bg-purple-300"
      style={{ backgroundImage: "url(/upload-product-bg-img.jpeg" }}
    >
      <div className="hero-overlay bg-opacity-60 grid place-items-center">
        <div className="hero-content p-0 lg:p-4 flex flex-col w-[19rem] lg:w-1/4">
          <h2 className="text-4xl lg:text-5xl text-white text-start">
            Upload a product
          </h2>
          <form
            className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-100"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleProductCreation(e);
            }}
          >
            <div className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product title</span>
                </label>
                <input
                  name="title"
                  type="text"
                  placeholder="product title"
                  className="input input-bordered bg-white"
                  onChange={(e) => handleInput(e, setStoreNewProduct)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  type="number"
                  step={0.01}
                  placeholder="price"
                  name="price"
                  className="input input-bordered bg-white"
                  onChange={(e) => handleInput(e, setStoreNewProduct)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Stock</span>
                </label>
                <input
                  type="number"
                  placeholder="stock"
                  name="stock"
                  className="input input-bordered bg-white"
                  onChange={(e) => handleInput(e, setStoreNewProduct)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Upload image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  className="file:btn file:btn-primary file:bg-purple-800 file:text-white file:hover:bg-white file:hover:text-purple-800 file:hover:border-2 file:hover:border-purple-800 bg-white"
                  onChange={(e) => updateProductImg(e)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product description</span>
                </label>
                <textarea
                  className="h-32 input input-bordered bg-white"
                  name="description"
                  onChange={(e) => handleInput(e, setStoreNewProduct)}
                ></textarea>
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

export default PostProduct;
