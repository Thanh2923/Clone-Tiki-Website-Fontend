"use client";
import { useState } from "react";
import Image from "next/image";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Product } from "@/types";

interface Item {
  productDetails: Product;
}

const ImageProductDetails: React.FC<Item> = ({ productDetails }) => {
  // Lấy danh sách URL hình ảnh từ dữ liệu sản phẩm
  const images = productDetails.images.map((img) => `/product/images/${img.url}`);

  const [activeIndex, setActiveIndex] = useState<number>(0);

  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="w-full bg-white p-5 mb-5 rounded-lg">
      <div className="flex flex-col justify-center items-center">
        {/* Hiển thị ảnh chính */}
        <div className="relative w-[100%] h-[400px] mb-4 overflow-hidden">
          <div className="w-[80%] h-full flex flex-col justify-center items-center py-5 relative m-auto">
            {images.length > 0 ? (
              <Image
  
                width={300}
                height={300}
                src={images[activeIndex]}
                alt="Product"
                className="rounded-lg w-full h-full object-contain"
              />
            ) : (
              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                No image available
              </div>
            )}
          </div>

          {/* Chỉ số ảnh */}
          {images.length > 1 && (
            <div className="bg-slate-200 px-2 rounded-lg absolute bottom-1 right-1 text-center mb-2">
              <span className="font-semibold">
                {activeIndex + 1} / {images.length}
              </span>
            </div>
          )}

          {/* Nút chuyển ảnh */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-gray-300 rounded hover:bg-gray-400 transition duration-300"
              >
                <FaAngleRight />
              </button>
            </>
          )}
        </div>

        {/* Ảnh nhỏ bên dưới */}
        <div className="flex h-[40px] space-x-2 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`relative w-14 h-14 cursor-pointer rounded-lg overflow-hidden transition-all duration-300 ${
                activeIndex === index ? "border-2 border-blue-500" : ""
              }`}
              onClick={() => setActiveIndex(index)}
            >
              <Image
                src={image}
                alt={`Thumbnail ${index}`}
                layout="fill"
                objectFit="cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageProductDetails;
