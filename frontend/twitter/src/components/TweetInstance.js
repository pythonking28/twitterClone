import Avatar from "react-avatar";
import { AiFillLike } from "react-icons/ai";
import { FaRegComment } from "react-icons/fa";
import { FaRegBookmark } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { TWEET_API_ENDPOINT } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { refreshFeed } from "../redux/tweetSlice";
import toast from "react-hot-toast"

const TweetInstance = ({ tweet }) => {
  const dispatch = useDispatch();
  const { user: id } = useSelector((store) => store.user);
  const likeHandler = async () => {
    try {
      const res = await axios.put(
        `${TWEET_API_ENDPOINT}/like/${tweet._id}`,
        { id },
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        dispatch(refreshFeed());
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteHandler = async (tweetId) => {
    try {
      const res = await axios.delete(`${TWEET_API_ENDPOINT}/delete/${tweetId}`);
      if (res.data.success) {
        dispatch(refreshFeed());
        toast.success("Tweet Deleted Successfully")
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="w-[80%] mx-auto mt-2 mb-3 border-b border-gray-100">
      <div>
        <div className="flex items-center">
          <div className="my-2 p-3 mx-2">
            <Avatar
              src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/461163695_4674678809424790_3264916131012691077_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=auvzRAe-UVUQ7kNvgFAXUeT&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AnwJWpvf-uMyDgUXjzjQVX-&oh=00_AYAlN76rZYZ6aaE6Ef_tb8wUi8qD3IsSDn2qZ2nIE7ZjcQ&oe=671BE2F4"
              size="40"
              round={true}
            />
          </div>
          <div>
            <div className="flex items-center">
              <h1 className="font-semibold capitalize">
                {tweet?.tweetuser[0]?.name}
              </h1>
              <p className="text-sm text-gray-400 ml-2">{`@${tweet?.tweetuser[0]?.username}. 1m`}</p>
            </div>

            <div>
              <h1>{tweet?.description}</h1>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-evenly">
          <div
            onClick={likeHandler}
            className="flex items-center gap-1 cursor-pointer"
          >
            <div>
              <AiFillLike />
            </div>
            <p>{tweet?.likes?.length}</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div>
              <FaRegComment />
            </div>
            <p>5</p>
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <div>
              <FaRegBookmark />
            </div>
            <p>5</p>
          </div>
          {id === tweet?.tweetuser[0]?._id && (
            <div
              onClick={() => deleteHandler(tweet?._id)}
              className="flex items-center gap-1 cursor-pointer"
            >
              <MdDelete />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default TweetInstance;
