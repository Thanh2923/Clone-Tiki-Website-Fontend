"use client"
import Image from "next/image"
import { FaStar } from "react-icons/fa";
import FormatPrice from "../formatPrice/FormatPrice";
import { Product } from "@/types";
import {usePathname } from "next/navigation";
import Link from "next/link";
import slugify from "../slugify/Slugify";
interface Products {
  products:Product[];
}
const ProductItemDetail:React.FC<Products> = ({products}) => {
  const pathname = usePathname();
  const basePath = "/" + pathname.split("/").slice(1, 3).join("/");
  return (
    <div className="w-full cursor-pointer  bg-white mb-5 grid grid-cols-3 gap-3 md:grid-cols-6 lg:grid-cols-10 ">
       {products?.map((product) => (
    
        <Link key={product.id} href={`${basePath}/${slugify(product.name)}/${product.id}`}>

<div   className="py-5  hover:shadow-xl rounded-lg flex px-3 bg-white flex-col">
    { product && product?.images.length > 0 ? (
            <Image
              className="rounded-lg w-auto h-auto"
              src={`/product/images/${product.images[0].url}`}  // Lấy ảnh đầu tiên
              alt={product.name}
              width={150}
              height={300}
            />
          ) : (
            <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500">
              No image available
            </div>
          )}
    <h3 className="py-2 font-medium">{product.name}</h3>
    <div className="w-full flex items-center gap-2">
      {[...Array(5)].map((_, idx) => (
        <FaStar key={idx} className="text-yellow-300" />
      ))}
    </div>
    <span className="text-red-500 font-semibold">
      
    <FormatPrice price={product.priceSale} />₫
    </span>
  </div>
        </Link>
      
 
))} 
    </div>
  )
}

export default ProductItemDetail
