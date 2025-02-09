"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { MdDeleteOutline } from "react-icons/md";
import Title from "../title/Title";
import { useSelector,useDispatch } from "react-redux";
import { RootState,AppDispatch } from "@/redux/store";
import FormatPrice from "../formatPrice/FormatPrice";
import { fetchCartByIdUser, removeAllCartByUserId, removeCartById, updateQuantity } from "@/redux/cart/cartThunk";
import { Cart, UpdateCart } from "@/types";
import DeleteItem from "../DeleteItem/DeleteItem";
import { toast } from "react-toastify";
import CartNull from "./CartNull";


  interface handle {
    handleSetTotal: (total: number) => void;
    handleCartItem: (cartItems: Cart[]) => void;  // Cập nhật kiểu nhận tham số
  }

const CartItem: React.FC<handle> = ({handleSetTotal,handleCartItem}) => {
  const dispatch = useDispatch<AppDispatch>();
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const { cartItems } = useSelector((state: RootState) => state.Cart);
  const [cart,setCart] = useState(cartItems || []);
  console.log(cart, "cart");
  console.log(cartItems, "cartItems");
  const [idDelete,setIdDelete] = useState<number[]>([]);
  const [isOpenDelete,setIsOpenDelete] = useState<boolean>(false);
  const isOpen = (id:number | null,IdCartItemChecked:number[] )=> {
    setIsOpenDelete(true);
      if(id){
         setIdDelete([id])
         return
      }else{
        setIdDelete(IdCartItemChecked)
      }
    
    
    }
  const isClose = ()=> setIsOpenDelete(false);
   const handleCheckboxAll = (checked:boolean)=>{
      const updateCartCheck =   cart.map((item)=>
      ({...item,checkbox:checked})
     )
     setCart(updateCartCheck)
    }
    const CartItemChecked = cart.filter(itemcart=> itemcart.checkbox);
     
    const IdCartItemChecked = cart.filter(item=> item.checkbox).map(item => item.id);
   
    const handleDeleteItem = async () => {
      try {
        if (CartItemChecked.length === cart.length) {
          // Nếu tất cả các sản phẩm trong giỏ đều được chọn, xóa tất cả
          await dispatch(removeAllCartByUserId());
          toast.success("Xoá tất cả sản phẩm thành công !");
        } else if (idDelete && idDelete.length > 0) {
          // Nếu có idDelete, xóa từng sản phẩm theo ID
          await dispatch(removeCartById(idDelete));
          toast.success("Xoá sản phẩm thành công !");
        } else {
          // Nếu không có gì được chọn, thông báo cho người dùng
          toast.error("Không có sản phẩm nào để xóa !");
        }
        setIsOpenDelete(false); // Đóng modal sau khi xử lý
      } catch (error) {
        console.error("Error deleting cart item:", error);
        toast.error("Đã có lỗi xảy ra khi xóa sản phẩm.");
        setIsOpenDelete(false); // Đảm bảo modal đóng dù có lỗi
      }
    };
    
    const handleCheckboxItem = (id:number,checked:boolean)=>{
     const updateCart = cart.map(item=>(
      item.id ===id ? {...item,checkbox:checked} : item
     ))
     setCart(updateCart)
    }
  useEffect(()=>{
    if(cartItems){
      setCart(cartItems) 
    }
  },[cartItems])

  useEffect(() => {
    const initialQuantities: { [key: number]: number } = {};
    cart.forEach(item => {
      initialQuantities[item.id] = item.quantity;
    });
    setQuantities(initialQuantities);
  }, [cart]);

  const increaseQuantity = async (id: number) => {
    setQuantities(prev => ({ ...prev, [id]: (prev[id] || 1) + 1 }));
   
    const data:UpdateCart = {
      cartId:id,
      quantity:quantities[id] + 1,
    }
    await dispatch(updateQuantity(data))
  };

  const decreaseQuantity = async (id: number) => {
    setQuantities(prev => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) - 1),
    }));

    const data:UpdateCart = {
      cartId:id,
      quantity:quantities[id] - 1,
    }
    await dispatch(updateQuantity(data))
  };

  const totalCheckBox = cart.reduce(
    (total,item)=> total + (item.checkbox ? 1 : 0),0
  )

  const totalPrice = cart.reduce(
    (total, item) =>
       total + (item.checkbox ? item.quantity * (item.product.priceSale - (item.product.priceSale * item.product.sale / 100) )  : 0), 
    0
  );

  useEffect(() => {
    handleSetTotal(totalPrice);
  }, [totalPrice,handleSetTotal]);

  useEffect(() => {
    handleCartItem(cart);
  }, [cart,handleCartItem]);

  useEffect(()=>{
    dispatch(fetchCartByIdUser())
  },[dispatch])

 

  return (
<div className="w-full">
  {isOpenDelete && <DeleteItem onDelete={handleDeleteItem} onCancel={isClose} />} 
  
  { cart.length > 0 ? (
    <div className="w-full py-5 rounded-lg bg-white">
    
      <div className="w-full flex items-center px-5 py-2 justify-between">
        <div className="w-[50%]">
          <input type="checkbox" onChange={(e) => handleCheckboxAll(e.target.checked)} /> 
          <span className="font-semibold text-slate-700">Tất cả (
            <span className="text-red-500">{totalCheckBox || 0} sản phẩm</span> )
          </span>
        </div>
        <span className="text-slate-500 hidden lg:block">Đơn giá</span>
        <span className="text-slate-500 hidden lg:block">Số lượng</span>
        <span className="text-slate-500 hidden lg:block">Thành tiền</span>
        <span onClick={() => isOpen(null, IdCartItemChecked)} className="cursor-pointer text-slate-500 text-xl">
          <MdDeleteOutline />
        </span>
      </div>

      <div className="w-full border-b-[1px] p-5">
        { cart && cart.map(cart => (
          <div key={cart.id} className="product mb-3 p-3 border rounded-lg bg-gray-50">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-center gap-2">
                <input type="checkbox" onChange={(e) => handleCheckboxItem(cart.id, e.target.checked)} checked={cart.checkbox} />
                <Image src={`/product/images/${cart?.product?.image}`} alt="Logo" width={80} height={40} />
                <h3 className="uppercase text-sm">{cart?.product?.name}</h3>
              </div>
              <span className="font-semibold text-red-500 lg:block hidden">
                <FormatPrice price={cart?.product?.priceSale - (cart?.product?.priceSale * cart?.product?.sale) / 100} /> ₫
              </span>
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 mt-2 lg:mt-0">
                <div className="flex items-center border px-2 py-1 rounded-md">
                  <button onClick={() => decreaseQuantity(cart.id)} className="px-2">-</button>
                  <span className="px-4">{quantities[cart.id] || 1}</span>
                  <button onClick={() => increaseQuantity(cart.id)} className="px-2">+</button>
                </div>

                <span className="font-semibold text-red-500 block lg:hidden">
                  <FormatPrice price={(cart?.product?.priceSale - (cart?.product?.priceSale * cart?.product?.sale) / 100) * (quantities[cart.id] || 1)} /> ₫
                </span>
              </div>
              <span className="font-semibold text-red-500 hidden lg:block">
                <FormatPrice price={(cart?.product?.priceSale - (cart?.product?.priceSale * cart?.product?.sale) / 100) * (quantities[cart.id] || 1)} /> ₫
              </span>
              <span onClick={() => isOpen(cart.id, IdCartItemChecked)} className="font-semibold cursor-pointer text-lg text-slate-500">
                <MdDeleteOutline />
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="w-full px-5 py-2 flex items-center">
        <Image src="/logo/xe.png" alt="Logo" width={30} height={30} />
        <h3 className="font-semibold text-gray-700">Freeship 10k đơn từ 45k, Freeship 25k đơn từ 100k</h3>
      </div>
    </div>
  ) : (
    <CartNull />
  )}


  <div className="w-full rounded-lg bg-white">
    <div className="px-3">
      <Title title="Sản phẩm mua kèm" />
    </div>
  </div>
</div>

  );
};

export default CartItem;