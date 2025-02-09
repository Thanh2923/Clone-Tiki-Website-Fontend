"use client"
import { useState } from 'react';
import Title from '../title/Title'
import Image from 'next/image'

const urlImage = [
    {
      title: "Dành cho bạn",
      url: "/suggestion/suggestion1.webp"
    },
    {
      title: "Top Deal",
      url: "/suggestion/suggestion2.webp"
    },
    {
      title: "Freeship 100k",
      url: "/suggestion/suggestion3.webp"
    },
    {
      title: "Siêu sale mẹ bé",
      url: "/suggestion/suggestion4.webp"
    },
    {
      title: "Sách xả kho - 60%",
      url: "/suggestion/suggestion5.webp"
    },
    {
      title: "Gia dụng - 50%",
      url: "/suggestion/suggestion6.webp"
    }
];

const SuggestionToday: React.FC = () => {
    const [active, setActive] = useState<number>(0);

    const handleClickActive = (id: number) => {
        setActive(id);
    };

    return (
        <div className='w-full px-2 rounded-t-lg bg-white'>
            <Title title='Gợi ý hôm nay' />
            <div className='w-full grid grid-cols-3 cursor-pointer md:grid-cols-4 lg:grid-cols-6'>
                {urlImage.map((item, index) => (
                    <div 
                        key={index}  // ✅ Đặt key ở đây
                        onClick={() => handleClickActive(index)} 
                        className={`${active === index ? "bg-blue-100 border-b-blue-500 border-b-2 text-blue-500" : ""} flex py-5 flex-col justify-center items-center`}
                    >
                        <Image 
                            className='rounded-lg' 
                            src={item.url} 
                            alt={item.title} 
                            width={30} 
                            height={30} 
                        />
                        <h3 className='pt-2 text-[14px]'>{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default SuggestionToday;
