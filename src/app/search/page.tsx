"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import ProductItem from "@/components/product/ProductItem";
import { Product } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
 
interface Data {
  products:Product[],
  currentPage:number,
  totalPages:number
}

const SearchPage = () => {
    const searchParams = useSearchParams();
    const query = searchParams.get("query") || "";

    const [products, setProducts] = useState<Data>({ products: [], currentPage: 1, totalPages: 1 });

    useEffect(() => {
        const fetchProducts = async () => {
            if (!query) return;

            try {
                const res = await fetch(`${API_URL}/product/search?searchQuery=${query}`, {
                    cache: "no-store",
                });

                if (!res.ok) {
                    throw new Error("Failed to fetch products");
                }

                const data = await res.json();
                setProducts(data);
            } catch (error) {
                console.error("Fetch error:", error);
                setProducts({ products: [], currentPage: 1, totalPages: 1 });
            }
        };

        fetchProducts();
    }, [query]);

    return (
        <div className="w-full">
            <ProductItem data={products} />
        </div>
    );
};

export default SearchPage;
