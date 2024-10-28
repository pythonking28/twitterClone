import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "User",
    initialState:{
        user:null,
        otherUser:null,
        profile:null,
        refreshprofile: false
    },
    reducers:{
        getUser: (state, action) => {
            state.user = action.payload
        },
        getOtherUser: (state,action) => {
            state.otherUser = action.payload
        },
        getProfile: (state, action) => {
            state.profile = action.payload
        },
        refreshProfile: (state) => {
            state.refreshprofile = !state.refreshprofile
        },
        clearUser: (state) => {
            state.user = null
            state.otherUser = null
            state.profile = null
            state.refreshprofile = false

        }
    }
})
export const {getUser, getOtherUser, getProfile, refreshProfile, clearUser} = userSlice.actions;
export default userSlice.reducer;
