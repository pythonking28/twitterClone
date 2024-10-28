
import { FaHome } from "react-icons/fa";
import { MdOutlineExplore } from "react-icons/md";
import { IoMdNotifications } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaBookmark } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { USER_API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { clearUser } from "../redux/userSlice";
import { clearTweet } from "../redux/tweetSlice";

const LeftSideBar = () => {
    const {user:id} = useSelector(store=>store?.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logouthandler = async() => {
        try {
            const res = await axios.get(`${USER_API_ENDPOINT}/logout`)
            if(res.data.success){
                toast.success(res.data.message)
                navigate("/login")
                dispatch(clearUser())
                dispatch(clearTweet())
            }
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div className="w-[20%]">
        <div>
            <div>
                <img width={"24px"} className="ml-5" src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png" alt="twitter-logo" />
            </div>
            <div className="my-3">
                <Link to="/" className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <FaHome size={24} />
                    </div>
                    <h3>Home</h3>
                </Link>
                <div className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <MdOutlineExplore size={24} />
                    </div>
                    <h3>Explore</h3>
                </div>
                <div className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <IoMdNotifications size={24} />
                    </div>
                    <h3>Notification</h3>
                </div>
                <Link to={`/profile/${id}`} className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <CgProfile size={24} />
                    </div>
                    <h3>Profile</h3>
                </Link>
                <div className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <FaBookmark size={24} />
                    </div>
                    <h3>Bookmark</h3>
                </div>
                <div onClick={logouthandler} className="flex my-2 p-3 font-bold text-lg hover:bg-gray-200 hover:cursor-pointer rounded-full">
                    <div className="mx-2">
                        <IoMdLogOut size={24} />
                    </div>
                    <h3>Logout</h3>
                </div>
                <button className="mx-5 my-2 px-12 py-3 bg-blue-500 rounded-full hover:cursor-pointer font-bold text-white text-lg">Post</button>
            </div>
        </div>
    </div>
  )
}
export default LeftSideBar