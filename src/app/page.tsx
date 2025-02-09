
import Banner from "@/components/banner/Banner";
import Categories from "@/components/categories/Categories";
import ProductItem from "@/components/product/ProductItem";
import SuggestionToday from "@/components/SuggestionToday/SuggestionToday";
import TopBrand from "@/components/TopBrand/TopBrand";
import { Product } from "@/types";

interface Products{
  currentPage:number,
  products:Product[],
  totalPages:number
}

const MainHome = async()=> {
const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/product`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const products: Products = await response.json();
  return (
   
   <>
   <div className="lg:w-[18%] lg:block hidden sticky z-10 top-[100px] md:top-[100px] h-full overflow-y-auto rounded-lg  bg-white ">
   <Categories />
         </div>
         <div className="lg:w-[80%] w-full rounded-lg h-full ">
    <div className="w-[98%]">
    <Banner/>
    </div>
    <TopBrand/>
    <SuggestionToday/>
    <ProductItem data={products}/>
    </div>
   </>

  )
}

export default MainHome



