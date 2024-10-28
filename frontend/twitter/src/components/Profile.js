import Avatar from "react-avatar";
import { IoArrowBack } from "react-icons/io5";
import { Link, useParams } from "react-router-dom";
import { useGetProfile } from "../hooks/useGetProfile";
import {useDispatch, useSelector} from "react-redux";
import { USER_API_ENDPOINT } from "../utils/constants";
import axios from "axios";
import toast from "react-hot-toast";
import { refreshProfile } from "../redux/userSlice";
import { refreshFeed } from "../redux/tweetSlice";

const Profile = () => {
  const {id} = useParams()
  const dispatch = useDispatch()
  useGetProfile(id)
  const {profile, user: userId} = useSelector(store=>store?.user)

  const followHandler = async()=>{
    try {
      const res = await axios.post(`${USER_API_ENDPOINT}/follow/${id}`,{id: userId},{
        withCredentials: true
      })
      if(res.data.success){
        toast.success(res.data.message)
        dispatch(refreshProfile())
        dispatch(refreshFeed())
      }else{
        toast.error(`Something went wrong`)
      }

    } catch (error) {
      console.log(error)
    }

  }


  return (
    <div className="mx-6 my-2">
      <div className="flex items-center gap-8 mb-2">
        <Link
          to="/"
          className="cursor-pointer hover:bg-gray-200 p-3 rounded-full"
        >
          <IoArrowBack size={24} />
        </Link>
        <div>
          <h1 className="font-semibold text-lg capitalize">{profile?.name}</h1>
          <p className="text-sm text-gray-600">16 Posts</p>
        </div>
      </div>
      <div className="h-[370px] overflow-clip rounded-lg">
        <img
          className="bg-cover"
          src="https://scontent.fktm21-2.fna.fbcdn.net/v/t39.30808-6/302135330_4037187179840626_5791332777284130229_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=M6POFaQnKFUQ7kNvgE3c1jD&_nc_zt=23&_nc_ht=scontent.fktm21-2.fna&_nc_gid=Ad4NCjQokFb4qvJdHgn0_UL&oh=00_AYCgJlvePeFWo-3DpRbDZkjI0GQtbxt_6gOJ_RL9MB947Q&oe=671BBC39"
          alt="Banner"
        />
      </div>
      <div>
        <div className="m-2 absolute top-72 border-[6px] border-white rounded-full">
          <Avatar
            src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/461163695_4674678809424790_3264916131012691077_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=auvzRAe-UVUQ7kNvgFAXUeT&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AnwJWpvf-uMyDgUXjzjQVX-&oh=00_AYAlN76rZYZ6aaE6Ef_tb8wUi8qD3IsSDn2qZ2nIE7ZjcQ&oe=671BE2F4"
            size="200"
            round={true}
          />
        </div>
        <div className="text-right m-3">
          {(userId === profile._id) ? (<button className="border-2 border-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-300">
            Edit Profile
          </button>): (<button onClick={followHandler} className="border-2 border-gray-600 p-2 rounded-full cursor-pointer hover:bg-gray-300">
            { profile.follower.includes(userId) ? "Following" : "Follow"}
          </button>)}
        </div>
      </div>
      <div className="ml-6">
        <div>
          <h1 className="font-bold text-lg capitalize">{profile?.name}</h1>
          <p className="text-sm text-gray-700">{`@${profile?.username}`}</p>
        </div>
        <div className="mt-3">
          <p className="">
            Studies at Institute of Engineering, Thapathali Campus Studied
            Science at Dhanusha science campus Janakpurdham(Dhanusha,nepal) Went
            to New vision Lives in Janakpur From Janakpur
          </p>
        </div>
      </div>
    </div>
  );
};
export default Profile;
