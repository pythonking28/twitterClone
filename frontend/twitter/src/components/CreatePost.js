import { useState } from "react";
import Avatar from "react-avatar";
import { IoMdPhotos } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TWEET_API_ENDPOINT } from "../utils/constants";
import { refreshFeed, setFollowing } from "../redux/tweetSlice";

const CreatePost = () => {
  const dispatch = useDispatch();
  const [content, setContent] = useState("");
  const { user: id } = useSelector((store) => store.user);
  const { following } = useSelector((store) => store.tweet);
  const postHandler = async () => {
    if (content) {
      const res = await axios.post(
        `${TWEET_API_ENDPOINT}/create`,
        {
          description: content,
          userId: id,
        },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(refreshFeed());
      }
    }
  };
  const followingHandler = async() => {
    dispatch(setFollowing(true))
  }

  const forYouHandler = async() => {
    dispatch(setFollowing(false));
  }
  return (
    <div className="w-[80%] mx-auto mt-2 mb-3">
      <div className="m-3">
        <div className="flex items-center justify-around text-center border-b border-gray-100">
          <div onClick={forYouHandler} className={`${(!following)? "border-b-4 border-blue-400":""} hover:bg-gray-200 w-full py-3 font-semibold text-lg cursor-pointer`}>
            For You
          </div>
          <div onClick={followingHandler} className={`${following? "border-b-4 border-blue-400":""} hover:bg-gray-200 w-full py-3 font-semibold text-lg cursor-pointer`}>
            Following
          </div>
        </div>
        <div className="border-b border-gray-100">
          <div className="flex items-center ">
            <div className="my-2 p-3">
              <Avatar
                src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/461163695_4674678809424790_3264916131012691077_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=auvzRAe-UVUQ7kNvgFAXUeT&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AnwJWpvf-uMyDgUXjzjQVX-&oh=00_AYAlN76rZYZ6aaE6Ef_tb8wUi8qD3IsSDn2qZ2nIE7ZjcQ&oe=671BE2F4"
                size="50"
                round={true}
              />
            </div>
            <input
              className="outline-none text-lg"
              type="text"
              placeholder="What is happening???"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between m-2 mt-3">
            <div className="cursor-pointer">
              <IoMdPhotos size={32} />
            </div>
            <button
              onClick={postHandler}
              className="px-4 py-1 bg-blue-500 rounded-full hover:cursor-pointer font-semibold text-white text-lg"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreatePost;
