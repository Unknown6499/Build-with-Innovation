import React, { useState } from "react";
import Cart from "./Cart/Cart";
import Products from "./Products";
import { useLoaderData } from "react-router";
import { useAppSelector } from "./store";

interface productData {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}
const sortProductsByPriceLowToHigh = (
  products: productData[] | null
): productData[] => {
  if (!products) {
    return [];
  }

  return [...products].sort((a, b) => a.price - b.price);
};
const Product: React.FC = () => {
  const cartToggle = useAppSelector((state) => state.ui.cartIsVisible);
  const [sort, setSort] = useState<boolean>(false);
  const unsortedProductData = useLoaderData() as productData[];

  const sortHandler = () => {
    setSort((prevState: boolean) => !prevState);
  };

  const sortedProductData = sortProductsByPriceLowToHigh(unsortedProductData);

  return (
    <>
      <button onClick={sortHandler}>Sort</button>
      {cartToggle && <Cart />}
      {sort && <Products productData={sortedProductData} />}
      {!sort && <Products productData={unsortedProductData} />}
    </>
  );
};

export default Product;

export const loader = async () => {
  try {
    const response = await fetch("https://dummyjson.com/products?limit=0");
    const data = await response.json();
    return data.products;
  } catch (error: any) {
    console.log(error.message);
  }
  return null;
};
