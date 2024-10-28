import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../redux/userSlice";
export const useGetProfile = async (id) => {
  const dispatch = useDispatch();
  const {refreshprofile} = useSelector(store=> store.user)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${USER_API_ENDPOINT}/myprofile/${id}`, {
          withCredentials: true,
        });
        if (res) {
          dispatch(getProfile(res.data.user));
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (id) {
      fetchProfile();
    }
  }, [id, dispatch, refreshprofile]);
};


