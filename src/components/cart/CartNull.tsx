import { IoMdCart } from "react-icons/io";

const CartNull: React.FC = () => {
  return (
    <div className="w-full bg-white mb-3 p-5 flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 flex justify-center items-center">
        <IoMdCart className="text-5xl text-red-500" />
      </div>
      <h3 className="text-slate-800 font-semibold text-xl mt-2">
        Giỏ hàng trống
      </h3>
      <span className="text-gray-500 mt-1">
        Bạn tham khảo thêm các sản phẩm được gợi ý bên dưới nhé!
      </span>
    </div>
  );
};

export default CartNull;
