import { useAppDispatch } from '../store';
import { cartActions } from '../store/cart-slice';
import classes from './CartItem.module.css';
interface IPROPS {
  item:{id:number,title:string,quantity:number,totalPrice:number,price:number,image:string}
}
const CartItem:React.FC<IPROPS> = (props) => {
  const {id, title, quantity, totalPrice, price,image } = props.item;
  const dispatch = useAppDispatch();

  const decrementHandler = () => {
    dispatch(cartActions.removeItemFromCart(id));
  }
   const incrementHandler = () => {
     dispatch(cartActions.addItemToCart({ id, title, price, image,}));
   };


  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${totalPrice}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <img
        src={image}
        alt="product-image"
        style={{ width: "10rem", display: "block" }}
      />

      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={decrementHandler}>-</button>
          <button onClick={incrementHandler}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
