import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector , TypedUseSelectorHook} from "react-redux";
import uiSlice from './ui-slice'
import cartSlice from './cart-slice';

const store = configureStore({
    reducer:{ui: uiSlice.reducer, cart: cartSlice.reducer}
})

export default store;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelector;