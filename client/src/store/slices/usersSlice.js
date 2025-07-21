const { createSlice } = require("@reduxjs/toolkit");

const usersSlice = createSlice({
    name: "usersSlice",
    initialState: { value: 12 },
    reducers: {
        increment: (state) => {
            state.value + 1;
        },
    },
});

export const { increment } = usersSlice.actions;
export default usersSlice.reducer;
