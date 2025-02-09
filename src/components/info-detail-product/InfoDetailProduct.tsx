import Image from "next/image";
import { FaStar } from "react-icons/fa";
import Title from "../title/Title";
import { Product } from "@/types";
import FormatPrice from "../formatPrice/FormatPrice";

interface Item {
  productDetails: Product;
}

const images = [
  "/brand/brandPro1.png",
  "/brand/brandPro2.png",
  "/brand/brandPro3.png",
];

const InfoDetailProduct: React.FC<Item> = ({ productDetails }) => {
  return (
    <div className="w-full">
      <div className="w-full h-[250px] mb-10 rounded-lg bg-white py-5 px-5 flex flex-col">
        <div className="w-full flex items-center gap-2">
          {images.map((item, index) => (
            <Image key={index} src={item} alt="Logo" width={80} height={40} />
          ))}
        </div>
        <h3 className="text-[16px] text-slate-600 py-3 font-semibold">{productDetails.name}</h3>
        <div className="w-full py-2 flex gap-2 items-center">
          <span>4.8</span>
          {[...Array(5)].map((_, idx) => (
            <FaStar key={idx} className="text-yellow-300" />
          ))}
          <span className="text-slate-500"> Sản phẩm còn (<span className="text-red-500 font-semibold">{productDetails.stock}</span>)  | Đã bán 10</span>
        </div>
        <div className="w-full flex gap-3 items-center">
          <h3 className="text-red-500 font-semibold text-lg">
            {<FormatPrice price={ productDetails.priceSale - (productDetails.priceSale *  productDetails.sale ) /100}/>}₫
          </h3>
          <span className="w-10 h-5 flex justify-center items-center text-md rounded-lg bg-slate-300">
            -{productDetails.sale}%
          </span>
          <p className="text-gray-400 line-through">
            {<FormatPrice price={productDetails.priceSale}/>}₫
          </p>
        </div>
      </div>
      <div className="w-full px-5 hidden rounded-lg lg:h-[200px] bg-white">
        <Title title="Dịch vụ bổ sung" />
        <div className="flex py-2 items-center gap-3">
          <Image src="/logo/tikicart.png" alt="Logo" width={30} height={30} />
          <h3>Ưu đãi đến 600k với thẻ FDN Shop</h3>
        </div>
        <div className="flex items-center gap-3">
          <Image src="/logo/paylater.png" alt="Logo" width={30} height={40} />
          <h3>Mua trước trả sau</h3>
        </div>
      </div>
    </div>
  );
};

export default InfoDetailProduct;
