import Image from "next/image"
const cc = [
    "/chungchi/cc1.png",
    "/chungchi/cc2.svg",
    "/chungchi/cc3.png",
]

const pay = [
    "/pay/p1.png",
    "/pay/p2.png",
    "/pay/p3.png",
    "/pay/p4.jpg",
    "/pay/p5.png",
]
const Footer:React.FC = () => {
  return (
   <div className="w-full">
 <div className=" w-full border-b-[1px] m-auto px-5 py-5 bg-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        <div className="px-2">
            <h3 className="font-semibold text-[14px] mb-2">Hỗ trợ khách hàng</h3>
            <p className="text-[12px] text-slate-500">Hotline: 1900-6035
(1000 đ/phút, 8-21h kể cả T7, CN)

Các câu hỏi thường gặp
Gửi yêu cầu hỗ trợ
Hướng dẫn đặt hàng
Phương thức vận chuyển
Chính sách kiểm hàng
Chính sách đổi trả
Hướng dẫn trả góp
Chính sách hàng nhập khẩu
Hỗ trợ khách hàng: hotro@fdnshhop.vn

Báo lỗi bảo mật: security@fdnshhop.vn</p>
        </div>
        <div className="px-2">
            <h3 className="font-semibold text-[14px] mb-2">Về FDN Shop</h3>
            <p className="text-[12px] text-slate-500">
            Giới thiệu FDN Shop
FDN Shop Blog
Tuyển dụng
Chính sách bảo mật thanh toán
Chính sách bảo mật thông tin cá nhân
Chính sách giải quyết khiếu nại
Điều khoản sử dụng
Giới thiệu FDN Shop Xu
Tiếp thị liên kết cùng FDN Shop
Bán hàng doanh nghiệp
Điều kiện vận chuyển
                </p>
        </div>
        <div className="px-2">
            <h3 className="font-semibold text-[14px] mb-2">Hợp tác và liên kết</h3>
            <p className="text-[12px] text-slate-500">
            Quy chế hoạt động Sàn GDTMĐT
            Bán hàng cùng FDN Shop
                </p>
                <h3 className="font-semibold text-[14px] mb-2">Chứng nhận bởi</h3>
                <div className="w-full flex gap-2">
     {cc.map((item,index)=>(
      
        <Image key={index} className='rounded-lg' 
     src={item}
 alt="Logo"
  width={30}
  height={30}
 />
        
     ))}
                </div>
        </div>
        <div className="px-2">
            <h3 className="font-semibold text-[14px] mb-2">Phương thức thanh toán</h3>
           
               
                <div className="w-full grid grid-cols-3 gap-1">
     {pay.map((item,index)=>(
      
        <Image key={index} className=' w-auto h-auto rounded-lg' 
     src={item} 

 alt="Logo"
  width={30}
  height={30}
 />
       
     ))}
                </div>
        </div>
    </div>
    
    <div className="w-full px-5 py-5 bg-white grid grid-cols-1">
    <div className="px-2">
            <h3 className="font-semibold text-[14px] mb-2">Công ty TNHH FDN Shop</h3>
            <p className="text-[12px] text-slate-500">Tòa nhà số 52 đường Út Tịch, Phường 4, Quận Tân Bình, Thành phố Hồ Chí Minh</p>
            <p className="text-[12px] text-slate-500">Giấy chứng nhận đăng ký doanh nghiệp số 0309532909 do Sở Kế Hoạch và Đầu Tư Thành phố Hồ Chí Minh cấp lần đầu vào ngày 06/01/2010.</p>
            <p className="text-[12px] text-slate-500">Hotline: <span className="text-blue-500">0931 247 957</span></p>
        </div>
    </div>

   </div>
  )
}

export default Footer
