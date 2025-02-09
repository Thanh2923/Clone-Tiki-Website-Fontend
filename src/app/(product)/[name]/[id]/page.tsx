"use client";

import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "next/navigation";
import axios from "axios";
import ProductItemMain from "@/components/product/ProductItemMain";
import { Product } from "@/types";
import FilterProduct from "@/components/filterProduct/FilterProduct";
import Loading from "@/components/loading/Loading";

interface ProductResponse {
  products: Product[];
  totalPages: number;
}

const fetchProduct = async (
  limit: string = "10",
  page: string = "1",
  categoryId: string,
  brandId?: string,
  minPriceSale?: string,
  maxPriceSale?: string
): Promise<ProductResponse> => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const params: { [key: string]: string | undefined } = {
    limit,
    page,
    categoryId,
  };

  if (brandId) params.brandId = brandId;
  if (minPriceSale) params.minPriceSale = minPriceSale;
  if (maxPriceSale) params.maxPriceSale = maxPriceSale;

  if (!apiUrl) {
    console.error("NEXT_PUBLIC_API_URL is not defined");
    return { products: [], totalPages: 0 };
  }

  try {
    const res = await axios.get(`${apiUrl}/product`, { params });
    return {
      products: res.data.products || [],
      totalPages: res.data.totalPages || 0,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    return { products: [], totalPages: 0 };
  }
};

// Client Component
const Page = () => {
  const { id: categoryIdRaw } = useParams(); // Lấy categoryId từ URL params
  const searchParams = useSearchParams(); // Lấy các searchParams từ URL

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Kiểm tra nếu categoryId là một mảng, lấy phần tử đầu tiên
  const categoryId = Array.isArray(categoryIdRaw) ? categoryIdRaw[0] : categoryIdRaw;

  // Lấy các tham số tìm kiếm từ URL query params
  const limit = searchParams.get("limit") || "10";
  const page = searchParams.get("page") || "1";
  const brandId = searchParams.get("brandId") || "";
  const minPriceSale = searchParams.get("minPriceSale") || "";
  const maxPriceSale = searchParams.get("maxPriceSale") || "";

  useEffect(() => {
    if (!categoryId) return; // Kiểm tra nếu categoryId chưa có thì không thực hiện fetch

    const getProducts = async () => {
      setLoading(true); // Bắt đầu tải dữ liệu
      const { products } = await fetchProduct(
        limit,
        page,
        categoryId,
        brandId,
        minPriceSale,
        maxPriceSale
      );
      setProducts(products); // Lưu sản phẩm vào state
      setLoading(false); // Kết thúc tải dữ liệu
    };

    getProducts(); // Gọi hàm tải sản phẩm khi component mount
  }, [categoryId, limit, page, brandId, minPriceSale, maxPriceSale]);

  return (
    <div className="w-full flex flex-col">
      <FilterProduct />
      {loading ? (
        <Loading/>
      ) : (
        <ProductItemMain products={products} />
      )}
    </div>
  );
};

export default Page;
