import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { CartItemType } from '../models/CartItem';

type CartState = {
  list: CartItemType[];
};

const initialState: CartState = {
  list: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItemType>) {
      const { id, name, price } = action.payload;

      const itemExists = state.list.find((item) => item.id === id);
      const filteredCart = state.list.filter((item) => item.id !== id);
      const qty = itemExists ? itemExists.qty + 1 : 1;

      return {
        ...state,
        list: [...filteredCart, { id, name, price, qty }],
      };
    },
    removeFromCart(state, action: PayloadAction<CartItemType>) {
      if (action.payload) {
        const { id } = action.payload;

        const filteredCart: CartItemType[] = state.list.filter(
          (item) => item.id != id
        );

        return { ...state, list: [...filteredCart] };
      }
    },
    changeQuantity(state, action: PayloadAction<CartItemType>) {
      const { id, qty } = action.payload;
      const itemExists = state.list.find((item) => item.id === id);
      if (!itemExists) {
        throw new Error('Item must exist in order to update quantuty');
      }
      const updatedItem = { ...itemExists, qty };

      const filteredCart = state.list.filter((item) => item.id != id);

      return { ...state, list: [...filteredCart, updatedItem] };
    },
    submitCart(state) {
      return { ...state, list: [] };
    },
  },
});

export const { addToCart, removeFromCart, changeQuantity, submitCart } =
  cartSlice.actions;

export default cartSlice.reducer;
