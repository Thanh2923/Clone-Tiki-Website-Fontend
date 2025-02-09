"use client";
import { useRouter } from "next/navigation";
import { Cart } from '@/types'
import AddressUser from '../addressUser/AddressUser'
import FormatPrice from '../formatPrice/FormatPrice'
import { toast } from "react-toastify";
interface Total {
  totalPrice:number
  cartItem:Cart[]
}
const CartPurchase:React.FC<Total> = ({totalPrice,cartItem}) => {
  const router = useRouter();
  const CartItemChecked = cartItem.filter(itemcart=> itemcart.checkbox);
  const handleCheckout = () => {
    if(CartItemChecked.length >0){
      const encodedCart = encodeURIComponent(JSON.stringify(CartItemChecked));
      router.push(`/pay?order=${encodedCart}`);
    }else{
      toast.warning("Vui lòng chọn sản phẩm mua hàng !")
    }
  
  };
  return (
    <div className="  w-full rounded-lg shadow-md">
    <AddressUser/>

  
    <div className="mb-2 bg-white w-full p-5 rounded-lg">
      <h2 className="text-lg font-bold">FDN Shop Khuyến Mãi</h2>
      <p className="text-sm text-blue-500">👉 Mua thêm để freeship 15k</p>
    </div>

 
    <div className='w-full p-5 rounded-lg bg-white'>
    <div className="mt-4">
      <div className="flex justify-between">
        <span>Tổng tiền hàng</span>
        <span className="font-semibold"><FormatPrice price={totalPrice}/>₫</span>
      </div>
      <div className="flex justify-between text-red-500 text-lg font-bold mt-2">
        <span>Tổng tiền thanh toán</span>
        <span><FormatPrice price={totalPrice}/>₫</span>
      </div>
    </div>

   
    <button onClick={handleCheckout} className="w-full bg-red-500 text-white py-2 rounded-md mt-4 font-semibold">
      Mua Hàng (1)
    </button>
    </div>
  </div>
  )
}

export default CartPurchase
