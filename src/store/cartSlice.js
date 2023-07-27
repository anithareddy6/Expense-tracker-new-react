import { createSlice } from "@reduxjs/toolkit";

const initialCartState = { items: [], totalExpense: 0 };

const cartSlice = createSlice({
    name: "expense",
    initialState: initialCartState,
    reducers: {
        replaceExpense(state, action) {
            state.items = action.payload.items;
            state.totalExpense = action.payload.totalExpense;
        },
        addExpense(state, action) {
            const key = action.payload.key;
            const amount = action.payload.amount;
            const description = action.payload.description;
            const category = action.payload.category;
            state.items.push({
                key,
                amount,
                description,
                category
            });
        },
        removeExpense(state, action) {
            let res = state.items.find(item => item.key === action.payload);
            state.items = state.items.filter(item => item.key != action.payload);
            state.totalExpense = state.totalExpense - res.expense;
        }
    }
});


export const cartActions = cartSlice.actions;

export default cartSlice;