import { createSlice } from '@reduxjs/toolkit';

interface uislice {
    cartIsVisible: boolean,
}
const initialState: uislice = {
    cartIsVisible: false,
}
const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggle(state){
            state.cartIsVisible = !state.cartIsVisible;
        }
    }
})

export const uiActions = uiSlice.actions;
export default uiSlice;
