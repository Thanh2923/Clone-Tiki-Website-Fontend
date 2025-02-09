"use client"
import  { useState} from "react";
import Image from "next/image";
import { Product } from "@/types";
import FormatPrice from "../formatPrice/FormatPrice";
import { useDispatch } from "react-redux";
import { AppDispatch} from "@/redux/store";
import { addCart} from "@/redux/cart/cartThunk";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Item {
  productDetails: Product;
}
interface ItemCart {
  productId:number,
  quantity:number
}

const PurchaseProduct: React.FC<Item> = ({ productDetails}) => {
  const {data:session} = useSession();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [quantity, setQuantity] = useState<number>(1);
  const images = productDetails.images.map((img) => `/product/images/${img.url}`);
 const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const increaseQuantity = () => setQuantity(quantity + 1);
  const decreaseQuantity = () => setQuantity(Math.max(1, quantity - 1));
  const handleCheckout = () => {
    
      if(productDetails){
        const encodedCart = encodeURIComponent(JSON.stringify([{product:productDetails,quantity:quantity}]));
      router.push(`/pay?order=${encodedCart}`);
      }
   
  
  };
    const handleAddCart = async (productId: number) => {

      if(session){
        if (isButtonDisabled) return; 
        setIsButtonDisabled(true); 
    
        const itemCart: ItemCart = { productId, quantity };
         await dispatch(addCart(itemCart));
          toast.success(`Đã thêm sản phẩm vào giỏ hàng`)
      setTimeout(() => {
        setIsButtonDisabled(false); 
      }, 1000); 
      }else{
        toast.info("Vui lòng đăng nhập !") ;
        setTimeout(()=>{
          router.push("/login")
        },2000)
      }
      
    };


 
  return (
    <div className="w-full p-5 border rounded-lg  shadow-md bg-white">
      {/* Header */}
      <div className="flex border-b-[1px] pb-3 items-center gap-2">
        <Image src="/logo/logo1.png" alt="Tiki Trading" width={50} height={20} />
        <p className="text-gray-500 text-sm font-semibold">FDN Shop Trading</p>
        <span className="text-yellow-500 text-sm flex items-center">
          ⭐ 4.7 <span className="text-gray-400">(5.5tr+ đánh giá)</span>
        </span>
      </div>

      {/* Product */}
      <div className="flex flex-col items-center my-4">
        <Image src={images[0]} alt="Sản phẩm" width={80} height={100} />
        <p className="text-sm mt-2">{productDetails.name}</p>
      </div>

      {/* Quantity */}
      <div className="flex items-center gap-2">
        <p className="text-sm font-medium">Số Lượng</p>
        <div className="flex items-center border rounded-md px-2">
          <button
            className="px-2 text-lg font-bold text-gray-700"
            onClick={decreaseQuantity}
          >
            -
          </button>
          <span className="px-4 ">{quantity}</span>
          <button
            className="px-2 text-lg font-bold text-gray-700"
            onClick={increaseQuantity}
          >
            +
          </button>
        </div>
      </div>

      {/* Price */}
      <div className="mt-3">
        <p className="text-gray-500 text-sm">Tạm tính</p>
        <p className="text-xl text-red-500 font-bold"> <FormatPrice price={productDetails.priceSale} />₫</p>
      </div>

      {/* Buttons */}
      <div className="mt-4 flex flex-col gap-2">
        <button onClick={handleCheckout} className="bg-red-500 text-white py-2 rounded-md font-semibold">
          Mua ngay
        </button>
        <button  onClick={ ()=>handleAddCart(productDetails.id)} className="border hover:bg-blue-200  border-blue-500 text-blue-500 py-2 rounded-md font-semibold">
          Thêm vào giỏ
        </button>
        <button className="border hover:bg-blue-200  border-blue-500 text-blue-500 py-2 rounded-md font-semibold">
          Mua trước trả sau
        </button>
      </div>
    </div>
  );
};

export default  PurchaseProduct;
