import classes from './CartButton.module.css';
import { uiActions } from '../store/ui-slice';
import { useAppDispatch, useAppSelector } from '../store';
const CartButton = () => {
  const dispatch = useAppDispatch();
  const cartQuantity = useAppSelector(state => state.cart.totalQuantity)
  const toggleCartHandler = () => {
    dispatch(uiActions.toggle())
  }
  return (
    <button className={classes.button} onClick={toggleCartHandler}> 
      <span>My Cart</span>
      <span className={classes.badge}>{cartQuantity}</span>
    </button>
  );
};

export default CartButton;
