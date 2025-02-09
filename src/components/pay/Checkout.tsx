
import { Dispatch, SetStateAction } from "react";
import FormatPrice from "../formatPrice/FormatPrice"
import PaymentMethod from "./PayMentMethod";
interface TotalPriceOrder{
  totalAmount:number,
  handleCheckout:()=>void,
  setSelected: Dispatch<SetStateAction<string>>,
  selected: string;
}

const Checkout:React.FC<TotalPriceOrder> = ({totalAmount,handleCheckout,setSelected,selected}) => {

  return (
    <div className="w-full p-5 rounded-lg bg-white flex flex-col">
       <h3 className="text-lg font-semibold text-slate-800 mb-2 ">Đơn hàng</h3>
       <hr />
       <div className="w-full mt-2 flex justify-between">
         <div className="w-[70%]">
          <span className="text-md text-gray-400">Tổng tiền hàng</span>
         </div>
         <div className="w-[25%]">
          <span className="text-md text-slate-800"><FormatPrice price={totalAmount} /> ₫</span>
         </div>
       </div>
       <div className="w-full flex py-1 justify-between">
         <div className="w-[70%]">
          <span className="text-md text-gray-400">Phí vận chuyển</span>
         </div>
         <div className="w-[20%]">
          <span className="text-md text-slate-900">50.000đ</span>
         </div>
       </div>
       <div className="w-full flex py-1 justify-between">
         <div className="w-[70%]">
          <span className="text-md text-gray-400">Giảm giá vận chuyển</span>
         </div>
         <div className="w-[20%]">
          <span className="text-md text-green-500 ">-25.000đ</span>
         </div>
       </div>
       <hr />
       <div className="w-full flex py-1 justify-between">
         <div className="w-[70%]">
          <span className="text-lg text-slate-800 font-semibold">Tổng tiền  thanh toán </span>
         </div>
         <div className="w-[30%]">
          <span className="text-lg text-red-500 font-semibold"><FormatPrice price={totalAmount - 25000} /></span>
         </div>
       </div>
       <div className="w-full flex py-1 justify-between">
         <div className="w-[60%]">
         </div>
         <div className="w-[40%]">
          <span className="text-md text-green-500 ">Tiếm kiệm 25.000đ</span>
         </div>
       </div>
       <span className="text-[12px] py-2 text-gray-400">(Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)</span>
       <PaymentMethod setSelected={setSelected} selected={selected}/>
       <button type="button" onClick={handleCheckout} className="w-full p-3 text-lg rounded-lg hover:bg-red-600 font-semibold bg-red-500 text-white text-center">Đặt hàng</button>
       
    </div>
  )
}

export default Checkout
