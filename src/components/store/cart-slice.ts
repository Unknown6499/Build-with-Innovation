import {createSlice, PayloadAction} from '@reduxjs/toolkit'
interface items {
    price: number,
    quantity: number,
    id: number,
    title: string,
    image: string,
    totalPrice:number,
}
interface initialState {
    items: items[],
    totalQuantity:number,
}
const initialState: initialState = {
    items: [],
    totalQuantity:0,
}
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addItemToCart(state, action: PayloadAction<{id:number,price:number,title:string,image:string}>) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
              state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    title: newItem.title,
                    image: newItem.image,
                })
            }
                else{
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
                }
        },
        removeItemFromCart(state, action: PayloadAction<number>) {
            const id = action.payload;
             const existingItemIndex = state.items.findIndex(
               (item) => item.id === id
             );
             const existingItem = state.items[existingItemIndex];
            state.totalQuantity>0?state.totalQuantity--:state.totalQuantity;

            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id)
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        },
        },
    },
)
export const cartActions = cartSlice.actions;
export default cartSlice;
