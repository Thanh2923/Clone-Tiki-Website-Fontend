
import { Product } from "@/types";
import Image from "next/image"
import { FaStar } from "react-icons/fa";
import FormatPrice from "../formatPrice/FormatPrice";

import Link from "next/link";
import slugify from "../slugify/Slugify";
interface Products {
  data:{
    products:Product[]
  }
}
const ProductItem:React.FC<Products> = ({data}) => {
  console.log(data,"data")
  return (
    <div className="w-full cursor-pointer  mt-3 grid grid-cols-3 gap-3 md:grid-cols-4 lg:grid-cols-5 ">
       { data && data.products.map((product) => (
         <Link key={product.id} href={`/${slugify(product?.category.name)}/${slugify(product.categoryId.toString())}/${slugify(product.name)}/${product.id}`}>
  <div  className="py-5  hover:shadow-xl rounded-lg flex px-3 bg-white flex-col">
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
    <span className="text-red-500 mt-1  font-semibold"> <FormatPrice price={(product.priceSale - (product.priceSale * product.sale) / 100) } />₫</span>
    <div className="w-full flex mt-1 gap-2">
      <span className="w-8 h-6 flex justify-center items-center bg-slate-200 text-[12px] rounded-xl">-{product.sale}%</span>
      <span className="text-gray-400 line-through"><FormatPrice price={product.priceSale } />₫</span>
    </div>
  </div>
  </Link>
))} 
    </div>
  )
}

export default ProductItem
