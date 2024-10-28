import { CiSearch } from "react-icons/ci";
import Avatar from "react-avatar";
import { useGetOtherProfile } from "../hooks/useGetOtherProfile";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RightSideBar = () => {
  const { user: id, otherUser } = useSelector((store) => store?.user);
  useGetOtherProfile(id);
  return (
    <div className="w-[20%]">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full border-none p-2">
        <div>
          <CiSearch size={24} />
        </div>
        <input
          type="text"
          className="bg-transparent outline-none border-none text-lg"
          placeholder="Search"
        />
      </div>
      <div className="p-4 my-4 rounded-lg bg-gray-100">
        <h1 className="font-bold text-lg">Who To Know</h1>
        {otherUser?.map((el) => (
          <div key={el._id} className="my-5 flex gap-3 items-center">
            <div className="">
              <Avatar
                src="https://scontent.fktm21-1.fna.fbcdn.net/v/t39.30808-6/461163695_4674678809424790_3264916131012691077_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=auvzRAe-UVUQ7kNvgFAXUeT&_nc_zt=23&_nc_ht=scontent.fktm21-1.fna&_nc_gid=AnwJWpvf-uMyDgUXjzjQVX-&oh=00_AYAlN76rZYZ6aaE6Ef_tb8wUi8qD3IsSDn2qZ2nIE7ZjcQ&oe=671BE2F4"
                size="40"
                round={true}
              />
            </div>
            <div>
              <h3 className="text-sm font-semibold">{el.name}</h3>
              <p className="text-sm">{`@${el.username}`}</p>
            </div>
            <Link to={`/profile/${el._id}`}>
            <button className="bg-black text-white rounded-full hover:cursor-pointer font-semibold px-2 py-1 mx-1">
              Profile
            </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};
export default RightSideBar;
