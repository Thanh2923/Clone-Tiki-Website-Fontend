"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";
import slugify from "../slugify/Slugify";

interface Item {
  id: number;
  name: string;
  image: string;
}

interface CategoriesProps {
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Categories:React.FC<CategoriesProps> = ({setIsOpen}) => {
  const router = useRouter();
  const [categories, setCategories] = useState<Item[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      try {
        const res = await axios.get(`${apiUrl}/category`);
        setCategories(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);
    
  const handleClickNext = (item:Item)=>{
       router.push(`/${slugify(item.name)}/${item.id}`);
       if(setIsOpen){
        setIsOpen(false)
       }
  }
   
  return (
    <div className="w-full">
      <div className="w-full px-2 py-5">
        <h2 className="font-semibold cursor-pointer px-5 py-2 text-[16px]">Danh mục</h2>
          <div className="w-full">
            { categories && categories.length > 0 ? (
              categories.map((item) => (
                
                  <div key={item.id} onClick={()=>handleClickNext(item)} className="flex gap-2 px-5 cursor-pointer py-2 w-full hover:bg-slate-200 rounded-lg items-center">
                    <Image
                      src={`/logo-categories/${item.image}`}
                      alt={item.name}
                      width={30}
                      height={30}
                    />
                    <h3 className="text-[14px]">{item.name}</h3>
                  </div>
               
              ))
            ) : (
              <p className="text-center text-gray-500">Đang tải...</p>
            )}
          </div>
       
      </div>
    </div>
  );
};

export default Categories;
