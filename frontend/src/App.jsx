import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import io from "socket.io-client"
import { setOnlineUsers, setSocket } from "./redux/socket/socketSlice"

const App = () => {
  const { user } = useSelector((state) => state.user)
  const { socket } = useSelector((state) => state.socket)
  const dispatch = useDispatch()

  useEffect(() => {
    if(user && !socket) {
      const socketInstance = io("https://private-chat-app-bg6b.onrender.com", {
        query: {
          userId: user._id
        }
      })

      dispatch(setSocket(socketInstance))
    } else {
      if(socket && !user) {
        socket.close()
        dispatch(setSocket(null))
      }
    }
  }, [user, socket])

  useEffect(() => {
    if(user) {
      socket?.on("getOnlineUsers", (users) => {
        dispatch(setOnlineUsers(users))
      })
    }
  }, [socket, user])

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={"/signin"}/>}/>
        <Route path="/update-profile" element={user ? <UpdateProfilePage /> : <Navigate to={"/signin"}/>}/>
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to={"/"}/>}/>
        <Route path="/signin" element={!user ? <SignInPage /> : <Navigate to={"/"}/>}/>
      </Routes>
      <ToastContainer theme={"light"} autoClose={3000} position="top-center" pauseOnHover={false} pauseOnFocusLoss={false}/>
    </>
  )
}

export default App
