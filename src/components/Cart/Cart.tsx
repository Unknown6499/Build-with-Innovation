import { Card } from 'react-bootstrap';
import classes from './Cart.module.css';
import CartItem from './CartItem';
import { useAppSelector } from '../store';

const Cart = () => {
  const cartItem = useAppSelector(state => state.cart.items)
  return (
    <Card className={classes.cart}>
      <h2 style={{ color: "black" }}>Your Shopping Cart</h2>
      <ul>
        {cartItem.map((item) => (
          <CartItem item={item} key={item.id}/>
        ))}
      </ul>
    </Card>
  );
};

export default Cart;
