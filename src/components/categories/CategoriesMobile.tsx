"use client"
import { RiHome2Fill } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { RiChat1Line } from "react-icons/ri";
import { CiUser } from "react-icons/ci";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { BsBorderStyle } from "react-icons/bs";

interface CategoriesProps {
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }

export const CategoriesMobile:React.FC<CategoriesProps> = ({setIsOpen}) => {
    const [active, setActive] = useState<number>(1);
    const router = useRouter();
    
    const handleClickSetActive = (id: number) => {
        setActive(id);
        
        if (id === 1) {
            router.push("/");
        } else if (id === 4) {
            router.push("/quan-ly-tai-khoan");
        }else if(id=== 2){
            setIsOpen((prev) => !prev);
        }else if (id === 5) {
            router.push("/quan-ly-don-hang");
        }
    };

    return (
    <>
     <div className="w-full lg:hidden block cursor-pointer border-t-2 z-50 fixed left-0 bottom-0 bg-white rounded-xl h-15">
            <div className="w-full py-2 grid grid-cols-5">
                <div onClick={() => handleClickSetActive(1)} className={` ${active === 1 ? "text-blue-500" : ""} w-full items-center justify-center flex flex-col`}>
                    <RiHome2Fill className="text-xl" />
                    <h3>Trang Chủ</h3>
                </div>
                <div onClick={() => handleClickSetActive(2)} className={` ${active === 2 ? "text-blue-500" : ""} w-full items-center justify-center flex flex-col`}>
                    <BiCategory className="text-xl" />
                    <h3>Danh Mục</h3>
                </div>
                <div onClick={() => handleClickSetActive(3)} className={` ${active === 3 ? "text-blue-500" : ""} w-full items-center justify-center flex flex-col`}>
                    <RiChat1Line className="text-xl" />
                    <h3>Chat</h3>
                </div>
                <div onClick={() => handleClickSetActive(4)} className={` ${active === 4 ? "text-blue-500" : ""} w-full items-center justify-center flex flex-col`}>
                    <CiUser className="text-xl" />
                    <h3>Cá nhân</h3>
                </div>
                <div onClick={() => handleClickSetActive(5)} className={` ${active === 5 ? "text-blue-500" : ""} w-full items-center justify-center flex flex-col`}>
                    <BsBorderStyle className="text-xl" />
                    <h3>Đơn hàng</h3>
                </div>
            </div> 
        </div>
       
    </>
    );
};