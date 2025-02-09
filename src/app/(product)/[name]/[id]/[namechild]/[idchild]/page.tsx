import ImageProductDetails from "@/components/Image-Product-Detail/ImageProductDetail";
import InfoDetailProduct from "@/components/info-detail-product/InfoDetailProduct";
import ProductItemDetail from "@/components/product/ProductItemDetail";
import PurchaseProduct from "@/components/purchase-product/PurchaseProduct";
import Title from "@/components/title/Title";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface PageProps {
  params: Promise<{ id: string; idchild: string }>;
}
// Hàm fetch dữ liệu từ API
const fetchProductData = async (idchild: string, id: string) => {
  if (!apiUrl) {
    console.error("API URL không được định nghĩa");
    return { productDetails: null, similarProducts: [] };
  }

  try {
    const [productDetailsRes, similarProductsRes] = await Promise.all([
      fetch(`${apiUrl}/product/${idchild}`).then((res) => res.json()),
      fetch(`${apiUrl}/product?categoryId=${id}`).then((res) => res.json()),
    ]);

    return {
      productDetails: productDetailsRes || null,
      similarProducts: similarProductsRes?.products || [],
    };
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu sản phẩm:", error);
    return { productDetails: null, similarProducts: [] };
  }
};

// **Server Component** không cần `await` params.
const Page = async ({ params }: PageProps) => {
  const { id, idchild } = await params;

  const { productDetails, similarProducts } = await fetchProductData(idchild, id);

  if (!productDetails) {
    return <div className="w-full flex flex-col text-red-500">Lỗi: Không thể tải dữ liệu sản phẩm</div>;
  }

  return (
    <div className="w-full flex flex-col">
      <div className="w-full mb-5 gap-3 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3">
        <ImageProductDetails productDetails={productDetails} />
        <InfoDetailProduct productDetails={productDetails} />
        <PurchaseProduct productDetails={productDetails} />
      </div>

      <div className="w-full bg-white">
        <div className="w-full px-3">
          <Title title="Sản phẩm tương tự" />
        </div>
        <ProductItemDetail products={similarProducts} />
      </div>
    </div>
  );
};

export default Page;
