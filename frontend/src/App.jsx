import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"
import UpdateProfilePage from "./pages/UpdateProfilePage"
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/update-profile" element={<UpdateProfilePage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signin" element={<SignInPage />}/>
      </Routes>
      <ToastContainer theme={"light"} autoClose={3000} position="top-center" pauseOnHover={false} pauseOnFocusLoss={false}/>
    </>
  )
}

export default App
