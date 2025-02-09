import Title from "../title/Title"
import Image from "next/image"
const urlImage = [
    "/brand/brand1.png",
    "/brand/brand2.png",
    "/brand/brand3.png",
    "/brand/brand4.png",
    "/brand/brand5.jpg",
    "/brand/brand6.png",
    
]
const TopBrand:React.FC = () => {
  return (
    <div className="w-full rounded-lg px-2 pb-5 mb-5  bg-gradient-to-r from-indigo-200">
      <Title title="Thương hiệu nổi bật"/>
      <div className="w-full grid cursor-pointer grid-cols-3 gap-5 md:grid-cols-4 lg:grid-cols-6">
        {urlImage.map((item,index)=>(

 <div key={index}>
 <Image  className='rounded-lg' 
                      
                                   src={item}
                                   alt="Logo"
                                   width={1000}
                                   height={500}
                                   
                                 />

 </div>
        ))}
 
      </div>
    </div>
  )
}

export default TopBrand
