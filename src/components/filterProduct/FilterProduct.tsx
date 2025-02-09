"use client";

import { useState,useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Title from "../title/Title";
import { Button } from "../ui/button";
import CustomRangeSlider from "./CustomRangeSlider";
import BrandItem from "../brandItem/BrandItem";


const FilterProduct = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
 const pathname = usePathname();
  const basePath = "/" + pathname.split("/").slice(1, 3).join("/");
  // Lấy categoryId từ URL params
  const categoryId = searchParams.get("categoryId") || "";

  const minRange = 0;
  const maxRange = 50000000;

  // State lưu giá trị lọc
  const [minPrice, setMinPrice] = useState<number>(minRange);
  const [maxPrice, setMaxPrice] = useState<number>(maxRange);
  const [brandId, setBrandId] = useState<string | null>(null);  // Chỉnh sửa thành string | null

  // Xử lý khi ấn nút "Lọc"
  const handleFilter = useCallback(() => {
    const params = new URLSearchParams();
    params.set("categoryId", categoryId);
    params.set("limit", "");
    params.set("page", "");

    // Chỉ thêm các giá trị nếu người dùng lọc
    if (brandId) params.set("brandId", brandId);  // Nếu brandId có giá trị
    if (minPrice !== minRange) params.set("minPriceSale", minPrice.toString());
    if (maxPrice !== maxRange) params.set("maxPriceSale", maxPrice.toString());

    router.push(`?${params.toString()}`);
  },[categoryId, brandId, minPrice, maxPrice, router]);


  // Xử lý khi ấn "Xoá tất cả"
  const handleReset = () => {
    router.push(`${basePath}`);
    setMinPrice(minRange);
    setMaxPrice(maxRange);
    setBrandId(null);  // Đặt lại thành null khi reset
  };

  return (
    <div className="w-full p-5 rounded-lg bg-white">
      <Title title="Tất cả sản phẩm" />
      <div className="w-full mb-3 lg:grid grid-cols-1 hidden md:grid-cols-2 lg:grid-cols-[60%,15%,25%]">
        <span className="text-sm text-slate-500">Thương hiệu</span>
        <span className="text-sm text-slate-500">Giá</span>
        <div className="px-[50px]">
          <span className="text-sm text-slate-500">Lọc</span>
        </div>
      </div>
      <div className="w-full grid grid-cols-1  md:grid-cols-2 lg:grid-cols-[60%,15%,25%]">
        {/* Cột đầu tiên (Thương hiệu) */}
        <BrandItem handleFilter={handleFilter} selectedBrand={brandId} setBrand={setBrandId} />

        {/* Cột thứ hai (Giá) */}
        <div className="lg:w-full w-[80%] mt-10 lg:mt-0">
          <CustomRangeSlider
            minRange={minRange}
            maxRange={maxRange}
            minPrice={minPrice}
            setMinPrice={setMinPrice}
            maxPrice={maxPrice}
            setMaxPrice={setMaxPrice}
          />
        </div>

        {/* Cột thứ ba (Lọc) */}
        <div className="w-full gap-3 mt-3 flex justify-center">
          <Button onClick={handleFilter} className="bg-blue-500 rounded-lg hover:bg-blue-600 text-white border">
            Xem kết quả
          </Button>
          <Button onClick={handleReset} className="bg-white rounded-lg hover:bg-slate-200 text-slate-800 border">
            Xoá tất cả
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterProduct;
