import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import SignUpPage from "./pages/SignUpPage"
import SignInPage from "./pages/SignInPage"

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />}/>
        <Route path="/signup" element={<SignUpPage />}/>
        <Route path="/signin" element={<SignInPage />}/>
      </Routes>
    </>
  )
}

export default App
