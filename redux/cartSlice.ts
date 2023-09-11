import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "pages/utils/http";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export interface ProductState {
    cartItem: CartItem[],
    loading: boolean,
    currentRequestId: undefined | string
}

const initialState: ProductState = {
    cartItem: [],
    loading: false,
    currentRequestId: undefined
}
// thunk
export const addCart = createAsyncThunk(
    'cart/addCart', async (body: Omit<CartItem[], 'id'>, thunkApi) => {
        const response = await http.post<CartItem>('post', body, {
            signal: thunkApi.signal
        })
        return response.data
    });

export const updateCart = createAsyncThunk(
    'cart/updateCart', async ({ cartId, body }: { cartId: string, body: CartItem }, thunkApi) => {
        const response = await http.put<CartItem>(`posts/${cartId}`, body, {
            signal: thunkApi.signal
        })
        return response.data
    });

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const item = state.cartItem.find(c => c.id === action.payload.id);
            if (item) {
                item.quantity++;
                item.attributes.price = item.oneQuantityPrice * item.quantity;
            }
            else {
                state.cartItem.push({ ...action.payload, quantity: 1 })
            }
        },
        // updateCart: (state, action: PayloadAction<CartItem>) => {
        //     state.cartItem = state.cartItem.map((p) => {
        //         if (p.id === action.payload.id) {
        //             if(action.payload. === 'quantity') {
        //         }
        //         return p;
        //     })
        // }
    }
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer