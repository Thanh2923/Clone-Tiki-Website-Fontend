"use client"
import { useSelector,useDispatch } from "react-redux";
import { AppDispatch,RootState } from "@/redux/store";
import {  fetchCartByIdUser } from "@/redux/cart/cartThunk";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
const QuantityCart:React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const {data:session} = useSession();
    const { cartItems } = useSelector((state: RootState) => state.Cart)
    useEffect(()=>{
    if(session){
        dispatch(fetchCartByIdUser())
    }
      },[dispatch,session])
  return (
    <span className='h-6 w-6 absolute text-[12px] top-[-20px] left-5 font-semibold flex items-center justify-center rounded-full text-white bg-red-500 '>{cartItems ? cartItems.length : 0}</span>
  )
}

export default QuantityCart
