import { useEffect, useState } from "react";
import axios from "axios"
import { USER_API_ENDPOINT } from "../utils/constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../redux/userSlice";

const Login = () => {
    const [name, setName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isUser, setIsUser] = useState(true);
    const [isLoading, setIsLoading] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user: id} = useSelector(store => store.user)
    const userHandler = () => {
        setIsUser(!isUser)
    }
    useEffect(()=> {
      if(id){
        navigate("/")
      }
    },[id, navigate])
    const submitHandler = async(e) => {
      e.preventDefault();
      if(!isUser){
        //register
        
        try {
          setIsLoading(true)
          const res = await axios.post(`${USER_API_ENDPOINT}/register`,{name, username, email, password})
          if(res.data.success){
            toast.success("Registered Successfully")
            navigate("/")
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          toast.error("Failed To Register")
        }
      }else{
        //login
        try {
          setIsLoading(true)
          const res = await axios.post(`${USER_API_ENDPOINT}/login`,{email,password},{
            withCredentials: true
          })
          if(res.data.success){
            toast.success("Signed In Successfully")
            dispatch(getUser(res?.data?.userId))
            navigate("/")
          }
          setIsLoading(false)
        } catch (error) {
          console.log(error)
          toast.error("Sign In Unsuccessfull")
        }
      }

      
    }
  return (
    <div className="flex items-center h-screen w-screen justify-around">
      <div>
        <img
          width={200}
          src="https://www.edigitalagency.com.au/wp-content/uploads/new-Twitter-logo-x-black-png-1200x1227.png"
          alt=""
        />
      </div>
      <div>
        <h1 className="text-6xl font-bold absolute top-20 right-52">Happening Now!!!</h1>
        <div className="mr-60">
          <h1 className="text-3xl font-bold">{isUser? 'Login' : 'Register'}</h1>
          <form className="flex flex-col mt-4 gap-4" onSubmit={submitHandler}>
            {!isUser && <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="name" className="text-lg border-b-2 border-gray-300 outline-none" />}
            {!isUser && <input type="text" value={username} onChange={e=>setUsername(e.target.value)} placeholder="username" className="text-lg border-b-2 border-gray-300 outline-none" />}
            <input type="text" value={email} onChange={e=>setEmail(e.target.value)} placeholder="email" className="text-lg border-b-2 border-gray-300 outline-none" />
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="password" className="text-lg border-b-2 border-gray-300 outline-none" />
            <button className="mt-4 bg-gray-500 text-white text-lg rounded-full px-12 py-2">{isLoading?"Please Wait...":(isUser? 'Login' : 'Register')}</button>
          </form>
          <p className="mt-3">{isUser?"Don't have an account" : "Already have an account?"} <span className="cursor-pointer border-b border-blue-500" onClick={userHandler}>{isUser? 'Register' : 'Login' }</span></p>
        </div>
      </div>
    </div>
  );
};
export default Login;
