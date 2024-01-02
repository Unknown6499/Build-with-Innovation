import React, { useState } from "react";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { useNavigate } from "react-router";
import CartButton from "../Cart/CartButton";
import { NavLink, useRouteLoaderData } from "react-router-dom";
import "./MainNavigation.css";

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

const MainNavigation: React.FC = () => {
  const token = useRouteLoaderData("root") as string | null;
  const [searchData, setSearchData] = useState<productData[] | null>(null);

  const navigate = useNavigate();
  const searchHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.trim();
    if (query.length === 0) {
      return setSearchData(null);
    }

    try {
      const response = await fetch(
        `https://dummyjson.com/products/search?q=${e.target.value}`
      );
      const data = await response.json();

      return setSearchData(data.products);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };
  const logOutHandler = () => {
    localStorage.removeItem("authToken");
    return navigate("/login");
  };
  return (
    <header className="header">
      <nav>
        <ul className="list">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          {!token && (
            <li>
              <NavLink to="/login" end>
                Login
              </NavLink>
            </li>
          )}
          {token && (
            <>
              <li>
                <NavLink to="/product" end>
                  Products
                </NavLink>
              </li>
              <li>
                <input
                  type="text"
                  placeholder="Search Products Here"
                  onChange={searchHandler}
                />
              </li>
              <ul>
                {searchData && (
                  <ListGroup className="searchResults">
                    {searchData.map((item) => (
                      <ListGroupItem
                        key={item.id}
                        style={{
                          textAlign: "center",
                          margin: "2px",
                          backgroundColor: "white",
                          borderRadius: "2px",
                          fontWeight: "500",
                          padding: "5px",
                          color: "black",
                        }}
                      >
                        {item.title}
                      </ListGroupItem>
                    ))}
                  </ListGroup>
                )}
                <li>
                  <CartButton />
                </li>
              </ul>
              <li>
                <button onClick={logOutHandler}>LogOut</button>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
