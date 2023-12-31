import React from 'react';
import { Card } from '@mui/material';
import './ProductItem.scss'
import { useAppDispatch } from './store';
import { cartActions } from './store/cart-slice';
interface IPROPS{
  id:number
    key:number
    title:string,
    price:number,
    description:string,
    image:string,
}
const ProductItem: React.FC<IPROPS> = (props) => {
  const {id, title, price, description,image } = props;
  const dispatch = useAppDispatch()
  const addCartHandler = (id:number) => {
    dispatch(cartActions.addItemToCart({id,title,price,image}))
  }
  return (
    <li className='item'>
      <Card className='card'>
        <header>
          <h3>{title}</h3>
          <div className='price'>${price}</div>
        </header>
          <img src={image} alt='product-image' style={{width:'10rem', display:'block'}}/>
        <p>{description}</p>
        <div className='actions'>
          <button style={{color:'white'}} onClick={() => addCartHandler(id)}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
