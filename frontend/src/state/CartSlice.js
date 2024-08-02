import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: localStorage.getItem("cart")
    ? JSON.parse(localStorage.getItem("cart"))
    : [],
};

const updateLocalStorage = (items) => {
  localStorage.setItem("cart", JSON.stringify(items));
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { item } = action.payload;
      const existingItem = state.items.find((i) => i.id === item.id);
      if (existingItem) {
        state.items = state.items.map((i) =>
          i.id === item.id ? { ...i, count: i.count + 1 } : i
        );
      } else {
        state.items.push({ ...item, count: 1 });
      }
      updateLocalStorage(state.items);
    },
    removeFromCart: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      updateLocalStorage(state.items);
    },
    increaseCount: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      );
      updateLocalStorage(state.items);
    },
    decreaseCount: (state, action) => {
      const { id } = action.payload;
      state.items = state.items.map((item) =>
        item.id === id && item.count > 1
          ? { ...item, count: item.count - 1 }
          : item
      );
      updateLocalStorage(state.items);
    },
    reset: (state) => {
      state.items = [];
      updateLocalStorage([]);
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  increaseCount,
  decreaseCount,
  reset,
} = cartSlice.actions;

export default cartSlice.reducer;
