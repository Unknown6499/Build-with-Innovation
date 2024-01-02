import React from "react";
import { useAppSelector } from "./store";
import Cart from "./Cart/Cart";

const Home: React.FC = () => {
  const cartState = useAppSelector((state) => state.ui.cartIsVisible);

  return (
    <>
      {cartState && <Cart />}
      <h1 style={{ textAlign: "center" }}>Welcome to our Store!</h1>
      <p style={{ textAlign: "center", fontSize: "2rem" }}>
        On this Store you can browse, add to cart, see your products in cart,
        searcdh and sort products based on price.
      </p>
    </>
  );
};
export default Home;
