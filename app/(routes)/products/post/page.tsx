import React from "react";

const PostProduct = () => {
  return (
    <div className="px-4 h-[80vh]">
      <h2 className="text-[2.5rem] mb-8">Upload your product</h2>
      <form className="mx-auto w-1/3 bg-gray-100 border border-purple-300 p-4 rounded-lg">
        <div className="flex flex-col mb-8">
          <label className="text-xl" htmlFor="title">
            Product title
          </label>
          <input
            type="text"
            name="title"
            placeholder="title"
            className="p-2 border border-gray-200"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label className="text-xl" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            name="price"
            placeholder="price"
            className="p-2 border border-gray-200"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label className="text-xl" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            placeholder="stock"
            className="p-2 border border-gray-200"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label className="text-xl" htmlFor="image">
            Upload Product image
          </label>
          <input
            type="file"
            name="image"
            className="pt-2 file:btn file:btn-primary file:bg-purple-800 file:text-white file:hover:bg-white file:hover:text-purple-800 file:hover:border-2 file:hover:border-purple-800"
          />
        </div>
        <div className="flex flex-col mb-8">
          <label className="text-xl" htmlFor="description">
            Description
          </label>
          <textarea
            name="description"
            placeholder="describe your product"
            className="p-2 border border-gray-200 rounded-lg h-32"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default PostProduct;
