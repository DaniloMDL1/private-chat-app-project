import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: localStorage.getItem("user-info") ? JSON.parse(localStorage.getItem("user-info")) : null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signUp: (state, action) => {
            state.user = action.payload
            localStorage.setItem("user-info", JSON.stringify(action.payload))
        }
    }
})

export const { signUp } = userSlice.actions

export default userSlice.reducer