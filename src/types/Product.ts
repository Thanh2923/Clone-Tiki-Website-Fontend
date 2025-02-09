export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    sale: number;
    priceSale: number;
    stock: number;
    categoryId: number;
    brandId: number;
    image:string;
    images: { id: number; url: string; productId: number }[];
    category: {
      id: number,
      name: string,
      image: string
    },
  }
  