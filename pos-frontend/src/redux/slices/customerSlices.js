import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  orderId: '',
  customerName: '',
  guests: 0,
  table: '',
};

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      const { name, guests } = action.payload;
      state.orderId = `${Date.now()}`;
      state.customerName = name;
      state.guests = guests;
    },

    removeCustomer: (state) => {
      state.customerName = '';
      state.guests = 0;
      state.table = '';
    },

    updateTable: (state, action) => {
      state.table = action.payload.table;
    },
  },
});

export const { setCustomer, removeCustomer, updateTable } =
  customerSlice.actions;
export default customerSlice.reducer;
