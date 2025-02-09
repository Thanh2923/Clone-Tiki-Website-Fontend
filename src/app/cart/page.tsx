"use client"
import CartItem from "@/components/cart/CartItem";
import CartPurchase from "@/components/cart/CartPurchase";
import ProductItem from "@/components/product/ProductItem";
import { Cart, Product } from "@/types";
import { useCallback, useEffect, useState } from "react";
interface Products{
  currentPage:number,
  products:Product[],
  totalPages:number
}
const CartPage: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const [products, setProducts] = useState<Products>({
    currentPage: 1,
    products: [],
    totalPages: 1,
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [cartItem, setCartItem] = useState<Cart[]>([]); // Sửa lại kiểu từ Cart thành Cart[]
  const handleSetTotal = useCallback((total: number) => {
    setTotalPrice(total);
  }, []);

  const handleCartItem = useCallback((cartItems: Cart[]) => {
   setCartItem(cartItems)
  }, []);
 // Fetch products data
 useEffect(() => {
  const fetchProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/product`);
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: Products = await response.json();
        setProducts(data); // Lấy danh sách sản phẩm từ API
    } catch (error) {
      console.error(error);
    }
  };

  fetchProducts();
}, [API_URL]);

  return (
<div className="w-full">
  <h1 className="text-2xl text-gray-700 font-bold mb-4">GIỎ HÀNG</h1>
  <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4">
    <div className="w-full lg:col-span-8">
      <CartItem handleSetTotal={handleSetTotal} handleCartItem={handleCartItem} />
    </div>
    <div className="w-full lg:col-span-4">
      <CartPurchase totalPrice={totalPrice} cartItem={cartItem} />
    </div>

   
    <div className="w-full lg:col-span-12">
      <ProductItem data={products} />
    </div>
  
  </div>
</div>

  );
};

export default CartPage;
