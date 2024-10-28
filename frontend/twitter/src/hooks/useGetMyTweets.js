import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllMyTweets } from "../redux/tweetSlice";

export const useGetMyTweets = (id) => {
  const {refresh,following} = useSelector(store => store.tweet)
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchMyTweets = async () => {
      try {
        if(!following){
          const res = await axios.get(`${TWEET_API_ENDPOINT}/getalltweets/${id}`, {
            withCredentials: true,
          });
          if (res) {
            dispatch(getAllMyTweets(res.data.tweets));
          }
        }else{
          const res = await axios.get(`${TWEET_API_ENDPOINT}/getfollowingtweets/${id}`,{
            withCredentials: true
          })
          if (res) {
            dispatch(getAllMyTweets(res.data.tweets));
          }
        }

      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
        fetchMyTweets();
    }
  }, [id, dispatch, refresh, following]);
};


