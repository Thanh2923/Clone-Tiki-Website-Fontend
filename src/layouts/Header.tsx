import Link from 'next/link'
import Image from "next/image"
import { IoHomeOutline } from "react-icons/io5";
import { BsCart3 } from "react-icons/bs";
import QuantityCart from '@/components/quantity-cart/QuantityCart';
import InfoUser from './InfoUser';
import AddressHeader from '@/components/addressUser/AddressHeader';
import SearchHeader from './SearchHeader';

const Header:React.FC = () => {
  return (
     <header className="w-full bg-white flex flex-col ">
         <div className="title  flex justify-center gap-1 items-center w-full h-10 bg-green-50">
             
               <h3 className="text-[12px] text-green-500 font-semibold">Freeship đơn từ 45k, giảm nhiều hơn cùng</h3>
               <Image 
                 src="/logo/logo1.png"
                 alt="Logo"
                 width={70}
                 height={70}
                 className='p-1'
                 
               />
            
         </div>
         <div className="w-full flex py-2  border-b-[1px] px-10 justify-between"> 
               <div className="flex cursor-pointer  w-[40%] items-center gap-2  lg:w-[10%]  lg:flex-col">
               <Link href="/"><Image 
                 src="/logo/fdnshop.webp"
                 alt="Logo"
                 width={80}
                 height={30}
                 className='w-[50px] mb-2 h-[50px] rounded-lg'
                 
               /></Link>
               <span className="text-blue-800  font-semibold">FDN Shop</span>
               </div>
                <div className="lg:w-[55%] w-full  flex-col  flex search">
                   <SearchHeader/>
                    <div className='lg:flex flex-wrap lg:w-full  hidden gap-5 mt-1 items-center '>
                    <Link href="/" className='text-gray-500 font-medium'>đồ điện tử</Link>
                    <Link href="/" className='text-gray-500 font-medium'>xe cộ</Link>
                    <Link href="/" className='text-gray-500 font-medium'>mẹ & bé</Link>
                    <Link href="/" className='text-gray-500 font-medium'>nhà cửa</Link>
                    <Link href="/" className='text-gray-500 font-medium'>sách</Link>
                    </div>
                </div>
                <div className="lg:w-[30%] md:w-[50%] text-[14px] sm:w-full lg:flex  py-2 flex-col menu">
                  <div className='w-full flex items-center justify-center gap-7 '>
                 <div>
                 <div className='lg:flex gap-1 hidden justify-center '>
                 <Link href="/" className='text-gray-600 items-center  flex gap-2'>
                 <IoHomeOutline className='font-semibold text-[24px] '/>Trang chủ</Link>
                 </div>
                 </div>
                 <div className='lg:flex gap-1 hidden justify-center '>
                 <InfoUser/>
                
                 </div>
                 <div className='flex gap-1 relative justify-center items-center'>
               <Link href="/cart" className='text-gray-600  flex gap-2'> <BsCart3  className='text-blue-500 font-semibold text-[24px]' /></Link>
                 <QuantityCart/>
                 </div>
                  </div>
                 <AddressHeader/>
                </div>
         </div>
         <div className="w-full">
  <div className="lg:w-[80%] w-[90%] flex m-auto ">
    <ul className="flex-wrap flex w-full  items-center py-3">
      <li className="flex items-center">
        <a className='text-md text-blue-700 font-semibold' href="">Cam kết</a></li>
      <li className="flex items-center px-2 gap-1 border-r-2">
        <Image src="/logo/100.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">100% hàng thật</a>
      </li>
      <li className="flex items-center px-2 gap-1 border-r-2">
        <Image src="/logo/freeship.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">Freeship mọi đơn</a>
      </li>
      <li className="flex items-center px-2 gap-1 border-r-2">
        <Image src="/logo/hoantra.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">Hoàn trả 300% nếu hàng giả</a>
      </li>
      <li className="flex items-center px-2 gap-1 border-r-2">
        <Image src="/logo/30day.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">30 ngày đổi trả</a>
      </li>
      <li className="flex items-center px-2 gap-1 border-r-2">
        <Image src="/logo/giaonhanh.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">Giao hàng nhanh</a>
      </li>
      <li className="flex items-center px-2 gap-1">
        <Image src="/logo/giare.png" alt="Logo" width={30} height={30} className='p-1' />
        <a href="">Giá siêu rẻ</a>
      </li>
    </ul>
  </div>
</div>

     </header>
  )
}

export default Header
