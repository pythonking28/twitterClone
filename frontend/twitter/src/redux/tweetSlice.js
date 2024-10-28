import { createSlice } from "@reduxjs/toolkit";

const tweetSlice = createSlice({
    name: "tweet",
    initialState: {
        tweets:null,
        refresh: false,
        following: false
    },
    reducers:{
        getAllMyTweets: (state,action)=>{
            state.tweets = action.payload
        },
        refreshFeed: (state) => {
            state.refresh = !state.refresh
        },
        setFollowing: (state,action)=>{
            state.following = action.payload
        },
        clearTweet: (state) =>{
            state.tweets = null
            state.refresh = false
            state.following = false
        }
    }
});


export const {getAllMyTweets, refreshFeed, setFollowing, clearTweet} = tweetSlice.actions;
export default tweetSlice.reducer;