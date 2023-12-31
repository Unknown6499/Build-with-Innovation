import React, { useState } from 'react';
import Header from './Header';
import Products from './Products';
import { useLoaderData} from 'react-router';
import Cart from './Cart/Cart';
import { useAppSelector } from './store';

interface productData {
  "id": number,
  "title": string,
  "description": string,
  "price": number,
  "discountPercentage": number,
  "rating": number,
  "stock": number,
  "brand": string,
  "category": string,
  "thumbnail": string,
  "images": string[]
}
const sortProductsByPriceLowToHigh = (
  products: productData[] | null
): productData[] => {
  if (!products) {
    return [];
  }

  return [...products].sort((a, b) => a.price - b.price);
};
const Home:React.FC = () =>{

  const [sort, setSort] = useState<boolean>(false);
  const unsortedProductData = useLoaderData() as productData[] ;

  const cartState = useAppSelector((state) => state.ui.cartIsVisible);

  const sortHandler = () => {
    setSort(prevState => !prevState)
  }
 
 const sortedProductData = sortProductsByPriceLowToHigh(unsortedProductData);

  return (
    <>
      <Header />
      {cartState && <Cart />}
      <button onClick={sortHandler}>Sort</button>
      {sort && <Products productData={sortedProductData} />}
      {!sort && <Products productData={unsortedProductData} />}
    </>
  );
}
export default Home;


export const loader = async  () =>{
  try {
    const response = await fetch('https://dummyjson.com/products?limit=0');
    const data = await response.json();
    return data.products;
  } catch (error:any) {
    console.log(error.message)
  }
  return null;
}