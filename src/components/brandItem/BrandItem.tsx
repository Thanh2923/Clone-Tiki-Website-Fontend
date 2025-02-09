"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";
import { Brand } from "@/types";
import { useParams } from "next/navigation";

interface BrandItemProps {
  handleFilter: () => void;
  selectedBrand: string | null;  // Kiểu dữ liệu cho selectedBrand là string | null
  setBrand: (brandId: string | null) => void;
}

const BrandItem: React.FC<BrandItemProps> = ({ handleFilter,selectedBrand, setBrand }) => {
  const [brands, setBrands] = useState<Brand[]>([]);
   const { id: categoryIdRaw } = useParams(); 
  
    const categoryId = Array.isArray(categoryIdRaw) ? categoryIdRaw[0] : categoryIdRaw;

  useEffect(() => {
    const fetchBrand = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      if (!apiUrl) {
        console.error("NEXT_PUBLIC_API_URL is not defined");
        return;
      }

      try {
        const res = await axios.get(`${apiUrl}/brand/${categoryId}`);
        setBrands(res.data || []);
      } catch (error) {
        console.error("Error fetching brands:", error);
      }
    };

    fetchBrand();
  }, [categoryId]);

  const handleClickFilterByBrand = (brandId:number)=>{
    if(brandId === Number(selectedBrand)){
      setBrand(null)
    }else{
       setBrand(String(brandId))
    }
  }

  useEffect(() => {
    if (selectedBrand !== null) {
      handleFilter();
    }
  }, [selectedBrand,handleFilter]);

  return (
    <div className="w-full flex  flex-wrap gap-2">
      {brands.map((brand) => (
        <button
          key={brand.id}
          onClick={() => handleClickFilterByBrand(brand.id)}  // Sửa lại khi bỏ chọn
          className={`border text-sm h-[40px] flex items-center rounded-3xl px-5 hover:border-blue-500 ${selectedBrand === String(brand.id) ? "border-blue-500 bg-blue-100" : ""}`}
        >
          <Image
            className="rounded-lg w-auto h-auto"
            src={`/brandItem/${brand.image}`}
            alt={brand.name}
            width={40}
            height={10}
          />
        </button>
      ))}
    </div>
  );
};

export default BrandItem;
