"use client"
import React, { useRef } from "react";

// Định nghĩa kiểu cho props
interface CustomRangeSliderProps {
  minRange: number;
  maxRange: number;
  minPrice: number;
  setMinPrice: React.Dispatch<React.SetStateAction<number>>;
  maxPrice: number;
  setMaxPrice: React.Dispatch<React.SetStateAction<number>>;
}

const CustomRangeSlider: React.FC<CustomRangeSliderProps> = ({
  minRange,
  maxRange,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice}) => {
  const sliderRef = useRef<HTMLDivElement | null>(null);

  const step = 100000; // Bước nhảy mỗi lần tăng
 
  // Hàm tính toán tỷ lệ phần trăm
  const getPercentage = (value: number): number => ((value - minRange) / (maxRange - minRange)) * 100;

  // Hàm xử lý sự kiện khi di chuyển chuột
  const handleMouseMove = (e: MouseEvent, isMinThumb: boolean): void => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const offsetX = e.clientX - rect.left;
      let newPrice = Math.round(minRange + ((offsetX / sliderWidth) * (maxRange - minRange)));

      // Làm tròn giá trị về bội số của step
      newPrice = Math.round(newPrice / step) * step;

      // Cập nhật minPrice hoặc maxPrice nhưng không vượt quá các giới hạn
      if (isMinThumb) {
        setMinPrice(Math.min(Math.max(newPrice, minRange), maxPrice - step));
      } else {
        setMaxPrice(Math.max(Math.min(newPrice, maxRange), minPrice + step));
      }
    }
  };

  // Hàm xử lý sự kiện khi nhấn chuột vào thanh trượt
  const handleMouseDown = (isMinThumb: boolean): void => {
    const onMouseMove = (e: MouseEvent) => handleMouseMove(e, isMinThumb);
    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="w-full ">
      
      <div ref={sliderRef} className="relative w-full h-2 mb-2 bg-gray-300 rounded">
        {/* Thanh tô xanh giữa min và max */}
        <div
          className="absolute h-2 bg-blue-500 rounded"
          style={{
            left: `${getPercentage(minPrice)}%`,
            right: `${100 - getPercentage(maxPrice)}%`,
          }}
        ></div>

        {/* Thumb trái */}
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer -top-1"
          style={{ left: `${getPercentage(minPrice)}%` }}
          onMouseDown={() => handleMouseDown(true)}
        ></div>

        {/* Thumb phải */}
        <div
          className="absolute w-4 h-4 bg-blue-500 rounded-full cursor-pointer -top-1"
          style={{ left: `${getPercentage(maxPrice)}%` }}
          onMouseDown={() => handleMouseDown(false)}
        ></div>
      </div>
      <div className="flex   justify-between  text-gray-700">
        <span className="py-2 rounded-lg px-5 border ">{minPrice} đ</span>
        <span className="py-2 rounded-lg px-5 border ">{maxPrice} đ</span>
      </div>
    </div>
  );
};

export default CustomRangeSlider;
