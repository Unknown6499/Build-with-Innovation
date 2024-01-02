import React, {useState, useEffect} from 'react';
import './App.css'

import Login from './components/Login';
import Home from "./components/Home";
import { checkAuthLoader, tokenLoader } from "./utility/auth";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import MainNavigation from "./components/Pages/MainNavigation";
import Product, { loader as productLoader } from "./components/Product";

const App: React.FC = () => {
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    const localToken = localStorage.getItem("authToken");
    setAuthToken(localToken);
  }, [authToken]);

  const Layout: React.FC = (props: React.PropsWithChildren<{}>) => {
    return (
      <>
        <MainNavigation />
        {<Outlet /> || props.children}
      </>
    );
  };
  const routes = [
    {
      path: "/",
      id: "root",
      loader: tokenLoader,
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "product",
          loader: checkAuthLoader,
          children: [
            {
              index: true,
              element: <Product />,
              loader: productLoader,
            },
          ],
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
  ];
  const router = createBrowserRouter(routes);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;

