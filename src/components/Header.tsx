import React, { useState } from 'react'
import './Header.scss'
import { ListGroup, ListGroupItem } from "react-bootstrap";
import {useNavigate} from 'react-router'
import CartButton from './Cart/CartButton'


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

const  Header: React.FC = ()=> {

 const [searchData, setSearchData] = useState<productData[] | null>(null)
 
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
  const logOutHandler = () =>{
    localStorage.removeItem('authToken')
    return navigate('/login')
  }
  
  
  return  <header className='header'>
  <h1>Welcome To Our Store</h1>
  <nav>
      <ul>
        <li><input type='text' placeholder='Search Products Here' onChange={e => searchHandler(e)} /></li>
        {searchData && <ListGroup className='searchResults'>{searchData.map(item => <ListGroupItem key={item.id}  style={{textAlign:'center', margin:'2px',backgroundColor:'white',borderRadius:'2px',fontWeight:'500',padding:'5px'}}>{item.title}</ListGroupItem>)}</ListGroup>}
      <li>
     <CartButton/>
      </li>
      <li>
        <button onClick={logOutHandler}>LogOut</button>
        </li>
    </ul>
  </nav>
</header>
    
}  

export default Header;