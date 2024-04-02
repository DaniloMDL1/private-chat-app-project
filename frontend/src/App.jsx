import { Routes, Route, Navigate } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useSelector } from "react-redux"

const App = () => {
  const { user } = useSelector((state) => state.user)

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
