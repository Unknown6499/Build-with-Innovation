import React, { useState } from "react";
import ProductItem from "./ProductItem";
import "./Products.scss";
import InfiniteScroll from "react-infinite-scroll-component";
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
interface IPROPS {
  productData: productData[];
}
const Products: React.FC<IPROPS > = (props) => {
  const [items, setItems] = useState<
    {
      id: number;
      title: string;
      description: string;
      price: number;
      thumbnail: string;
    }[]
  >(props.productData);

  const fetchMoreData = () => {
    setTimeout(() => {
      setItems((items) => items.concat(Array.from(props.productData)));
    }, 3000);
  };
  return (
    <> <section className='products'>
    <h2>Buy your favorite products</h2>
    <ul>
      <InfiniteScroll
        dataLength={20} //This is important field to render the next data
        next={fetchMoreData}
        hasMore={true}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {items.map((item) => (
          <ProductItem
            key={item.id + Math.random()}
            id={item.id}
            title={item.title}
            price={item.price}
            description={item.description}
            image={item.thumbnail}
          />
        ))}
      </InfiniteScroll></ul></section>
    </>
  );
};

export default Products;
