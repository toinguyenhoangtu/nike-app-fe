import { AsyncThunk, createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import http from "pages/utils/http";

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>
type PendingAction = ReturnType<GenericAsyncThunk['pending']>
type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>
type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>

export interface CartState {
    cart: {
        isFetching: boolean,
        cartItem: NKResponseCart.CartItem[],
        editingCart: NKResponseCart.CartItem | null,
        currentRequestId: undefined | string,
        errors: NKResponseCart.CartErrors[],
        success: string
    }
}

const initialState: CartState = {
    cart: {
        isFetching: false,
        cartItem: [],
        editingCart: null,
        currentRequestId: undefined,
        errors: [],
        success: 'false'
    }

}
// // thunk
export const addCart = createAsyncThunk(
    'cart/addCart', async (body: NKResponseCart.CartItem, thunkApi) => {
        const response = await http.post<NKResponseCart.CartItem[]>('post', body, {
            signal: thunkApi.signal
        })
        return response.data
    });

export const updateCart = createAsyncThunk(
    'cart/updateCart', async ({ cartId, body }: { cartId: string, body: NKResponseCart.CartItem }, thunkApi) => {
        const response = await http.put<NKResponseCart.CartItem[]>(`posts/${cartId}`, body, {
            signal: thunkApi.signal
        })
        return response.data
    });

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (
            state,
            action: PayloadAction<NKResponseCart.CartItem>
        ) => {
            const item = state.cart.cartItem.find(c => c.id === action.payload.id);
            if (item) {
                item.quantity++;
                item.attributes.price = item.oneQuantityPrice * item.quantity;
            }
            else {
                state.cart.cartItem.push({ ...action.payload, quantity: 1 })
            }
        },
        setFetching: (
            state,
            { payload: { value = false } }: PayloadAction<{ value: boolean }>
        ) => {
            state.cart.isFetching = value
        },
    },
    extraReducers(builder) {
        builder
            .addCase(addCart.fulfilled, (state, action) => {
                state.cart.cartItem = action.payload
            })
            .addCase(addCart.pending, (state, action) => {
                
            })
            .addMatcher<PendingAction>(
                (action) => action.type.endsWith('/pending'),
                (state, action) => {
                    state.cart.isFetching = true;
                    state.cart.currentRequestId = action.meta.requestId;
                }
            )
            .addMatcher<RejectedAction>(
                (action) => action.type.endsWith('/rejected'),
                (state, action) => {
                    if (state.cart.isFetching && state.cart.currentRequestId === action.meta.requestId) {
                        state.cart.isFetching = false;
                        state.cart.currentRequestId = undefined;
                    }
                }
            )
            .addMatcher<FulfilledAction>(
                (action) => action.type.endsWith('/fulfilled'),
                (state, action) => {
                    if (state.cart.isFetching && state.cart.currentRequestId === action.meta.requestId) {
                        state.cart.isFetching = false;
                        state.cart.currentRequestId = undefined;
                        state.cart.success = 'success'
                    }
                }
            )

    }
})
export const { addToCart } = cartSlice.actions
export default cartSlice.reducer