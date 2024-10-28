import { Outlet, useNavigate } from "react-router-dom"
import LeftSideBar from "./LeftSideBar"
import RightSideBar from "./RightSideBar"
import { useGetMyTweets } from "../hooks/useGetMyTweets"
import { useSelector } from "react-redux"
import { useGetProfile } from "../hooks/useGetProfile"
import { useEffect } from "react"



const Home = () => {
  const {user:id} = useSelector(store=>store?.user)
  const navigate = useNavigate()
  useGetProfile(id)
  useGetMyTweets(id)
  useEffect(()=>{
    if(!id){
      navigate("/login")
    }
  },[id, navigate])
  return (
    <div className="flex w-[80%] justify-between mx-auto">
        <LeftSideBar />
        <Outlet />
        <RightSideBar />
    </div>
  )
}
export default Home