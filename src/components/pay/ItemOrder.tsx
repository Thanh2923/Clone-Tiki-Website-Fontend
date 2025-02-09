import Image from "next/image";
import FormatPrice from "../formatPrice/FormatPrice";

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

interface ItemOrderProps {
  id: number;
  product: Product;
  quantity: number;
}

const ItemOrder: React.FC<ItemOrderProps> = ({ product, quantity }) => {
  return (
  
    <div className="w-full">
      <div className="w-full py-5 mb-5 border px-2 border-green-500 rounded-xl grid grid-cols-12 gap-2 items-center">
        {/* Hình ảnh sản phẩm */}
        <div className="col-span-1">
          <Image
            src={`/product/images/${product.images[0]?.url}`} // Đảm bảo đường dẫn đúng
            alt={product.name}  // Thêm alt mô tả hình ảnh
            width={70}
            height={70}
          />
        </div>

        {/* Tên sản phẩm */}
        <div className="lg:col-span-5 col-span-6">
          <h3 className="text-slate-800">{product.name}</h3>
          x <span className="text-red-500">{quantity}</span>
        </div>

        {/* Giá sản phẩm */}
        <div className="lg:col-span-2 col-span-4">
          <h3 className="text-slate-800 font-semibold"> <FormatPrice price={(product.priceSale - (product.priceSale * product.sale) / 100) * quantity} /> ₫</h3>
        </div>

        {/* Thông tin giao hàng */}
        <div className="lg:col-span-4 hidden lg:block col-span-6">
          <div className="flex gap-2 p-2 px-3 bg-slate-200 rounded-lg">
            <Image
              src="/logo/xe.png" // Đảm bảo đường dẫn đúng
              alt="Shipping icon" // Thêm alt cho icon
              width={30}
              height={30}
            />
            <h3 className="text-gray-400 text-[12px]">Được giao bởi Vaca Baby House</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemOrder;
