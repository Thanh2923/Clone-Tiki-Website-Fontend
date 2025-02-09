"use client"
import { useRouter, useSearchParams } from "next/navigation";
import AddressUser from "@/components/addressUser/AddressUser";
import Checkout from "@/components/pay/Checkout";
import ItemOrder from "@/components/pay/ItemOrder";
import Title from "@/components/title/Title";
import { useDispatch, useSelector} from "react-redux";
import { createOrder } from "@/redux/order/orderThunk";
import { AppDispatch, RootState } from "@/redux/store";
import { useState } from "react";
import { toast } from "react-toastify";
import { createPayment } from "@/redux/payment/paymentThunk";

interface Product {
  id: number;
    name: string;
    description: string;
    price: number;
    sale: number;
    priceSale: number;
    stock: number;
    categoryId: number;
    brandId: number;
    image:string;
    images: { id: number; url: string; productId: number }[];
}

interface CartItem {
  id: number;
  product: Product;
  quantity: number;
  userId: number;
}


const Page: React.FC = () => {
  const searchParams = useSearchParams();
  const cartData = searchParams.get("order");
  const { users } = useSelector((state: RootState) => state.User);
  const [selected, setSelected] = useState("payos");
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  let cartItems: CartItem[] = [];
  try {
    cartItems = cartData ? JSON.parse(decodeURIComponent(cartData)) : [];
  } catch (error) {
    console.error("Error parsing cart data:", error);
  }

  
  const totalAmount = cartItems && cartItems.reduce((total, item) => {
    const discountedPrice = item.product.priceSale - (item.product.priceSale * item.product.sale) / 100;
    const itemTotal = discountedPrice * item.quantity;
    return total + itemTotal;
  }, 0);

  const newArray = cartItems && cartItems.map(item => ({
    productId: item.product.id, 
    quantity: item.quantity,
    price: Number(item.product.priceSale) - (Number(item.product.priceSale) * item.product.sale) / 100

  }));

  const cartIdItem = cartItems && cartItems.map(item=>item.id);
  
 const handleCheckout = async ()=>{
  if(users.length > 0 && !users[0]?.name){
    router.push("/address");
    return
}
    const orderData= {
      totalPrice:totalAmount - 25000,
      orderDetail:newArray,
      cartId:cartIdItem
    }

    const req = await dispatch(createOrder(orderData));

    const dataPayment = {
      orderId: req.payload.order,
      amount: orderData.totalPrice,
      paymentMethod: selected === "payos" ?  "paypal"  : "cash_on_delivery"
    }

   
    if(selected === "payos" ){
       const linkPayment =  await dispatch(createPayment(dataPayment))
        if( linkPayment && linkPayment.payload.zalopayUrl.order_url){
          toast.success("Tạo đơn hàng thành công !")
          router.push(linkPayment.payload.zalopayUrl.order_url)
        }
    }else if(selected === "cash"){
       await dispatch(createPayment(dataPayment))
      toast.success("Đơn hàng đã đặt thành công !");
      router.push("quan-ly-don-hang");
     return
    } else{
      toast.warning("Kiểm tra lại kết nối mạng !")
    }   
    }
 


  return (
    <div className="w-full p-5 grid gap-5 grid-cols-1 md:grid-cols-2 lg:grid-cols-12 h-full">
    <div className="lg:col-span-8 md:col-span-2 p-2 bg-white">
      <Title title="Chọn hình thức giao hàng" />
      <div className="w-full">
        <div className="w-full md:w-[50%] lg:w-[35%] rounded-xl p-5 h-[80px] bg-blue-100">
          <h3 className="text-md mb-1">
            Giao tiết kiệm <span className="p-1 bg-white rounded-xl text-green-500">-25%</span>
          </h3>
          <span className="text-gray-500 text-sm">Có 2 sản phẩm hỗ trợ hình thức này</span>
        </div>
      </div>
      <div className="w-full my-5 item-order">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <ItemOrder key={item.id} id={item.id} product={item.product} quantity={item.quantity} />
          ))
        ) : (
          <p className="text-gray-500">Không có sản phẩm trong giỏ hàng</p>
        )}
      </div>
    </div>
  
    <div className="lg:col-span-4 md:col-span-2">
      <div className="w-full flex-col">
        <AddressUser />
        <Checkout totalAmount={totalAmount} handleCheckout={handleCheckout} setSelected={setSelected} selected={selected} />
      </div>
    </div>
  </div>
  
  );
};

export default Page;
