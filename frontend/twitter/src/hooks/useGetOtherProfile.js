import axios from "axios";
import { USER_API_ENDPOINT } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getOtherUser } from "../redux/userSlice";


export const useGetOtherProfile = async (id) => {
    const dispatch = useDispatch();
    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axios.get(`${USER_API_ENDPOINT}/otherusers/${id}`, {
            withCredentials: true,
          });
          if (res) {
            dispatch(getOtherUser(res.data.otherUsers));
          }
        } catch (error) {
          console.log(error);
        }
      };
      if (id) {
        fetchProfile();
      }
    }, [id, dispatch]);
  };