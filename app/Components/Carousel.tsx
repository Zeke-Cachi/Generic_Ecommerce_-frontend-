import React from "react";
import Image from "next/image";

const Carousel = () => {
  return (
    <div className="carousel w-full h-[30rem]">
      <div id="slide1" className="carousel-item relative w-full">
        <Image
          src="/carousel-img/carousel-1.jpg"
          className="w-full object-contain"
          alt="carousel images"
          width={200}
          height={200}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide4" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide2" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide2" className="carousel-item relative w-full">
        <Image
          src="/carousel-img/carousel-2.jpg"
          className="w-full object-contain"
          alt="carousel images"
          width={500}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide1" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide3" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide3" className="carousel-item relative w-full">
        <Image
          src="/carousel-img/carousel-3.jpg"
          className="w-full object-contain"
          alt="carousel images"
          width={500}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide2" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide4" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
      <div id="slide4" className="carousel-item relative w-full">
        <Image
          src="/carousel-img/carousel-4.jpg"
          className="w-full object-contain"
          alt="carousel images"
          width={500}
          height={500}
        />
        <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
          <a href="#slide3" className="btn btn-circle">
            ❮
          </a>
          <a href="#slide1" className="btn btn-circle">
            ❯
          </a>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
