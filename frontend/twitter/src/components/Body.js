import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Home'
import Login from './Login'
import Profile from './Profile'
import Feed from './Feed'

const appRouter = createBrowserRouter([
    {
        path: "/" ,
        element: <Home />,
        children: [
            {
                path: "/",
                element: <Feed />
            },
            {
                path:"/profile/:id",
                element: <Profile />
            }
        ]
    },
    {
        path: "/login",
        element: <Login />
    }
])

const Body = () => {
  return (
    <div>
        <RouterProvider router={appRouter}/>
    </div>
  )
}
export default Body