import React, {useState, useEffect} from 'react';
import './App.css'

import Login from './components/Login';
import Home,{loader as productLoader} from './components/Home'
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
} from "react-router-dom";


const App:React.FC=()=> {
 
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    const localToken = localStorage.getItem('authToken');
    setAuthToken(localToken);
  }, [authToken])
  
    const ProtectedRoute = (props: React.PropsWithChildren<{}>)=>{
      if(!authToken){
         return <Navigate to='/login'/>
      }
      return <>{props.children}</>;
    }
   
  const Layout:React.FC =(props:React.PropsWithChildren<{}>) =>{
  return  <>{<Outlet/> || props.children}</>
  }
  const routes =[
    {
    path:'/',
    element: <ProtectedRoute><Layout/></ProtectedRoute>,
    children:[
      {
        path:'/',
        element:<Home/>,
        loader:() =>productLoader(),
      }, 
    ]
  },
  {
    path: "/login",
    element: <Login/>,
    },

]
  const router = createBrowserRouter(routes);
  return <div><RouterProvider router={router}/></div>
}

export default App;

