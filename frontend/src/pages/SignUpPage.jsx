import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link, useNavigate } from "react-router-dom"
import { useSignUpMutation } from "../redux/user/authApi"
import { signUp } from "../redux/user/userSlice"
import { Spinner } from "flowbite-react"
import { toast } from "react-toastify"

const SignUpPage = () => {
    const [inputs, setInputs] = useState({
        fullName: "",
        username: "",
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

    // signup api
    const [ signUpApi, { isLoading } ] = useSignUpMutation()

    const handleSignUp = async (e) => {
        e.preventDefault()
        try {

            const res = await signUpApi(inputs).unwrap()

            dispatch(signUp({ ...res }))
            
        } catch(error) {
            if(error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }

    }

    return (
        <div className="min-h-screen flex justify-center items-center font-roboto">
            <div className="border border-slate-200 p-3 max-sm:w-[280px] w-[340px]">
                <div className="text-2xl font-medium text-center">
                    Sign Up
                </div>
                <form onSubmit={handleSignUp} className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="fullNameInput">Full Name</label>
                        <div>
                            <input 
                                id="fullNameInput"
                                type="text"
                                placeholder="Full Name"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg focus:ring-0"
                                value={inputs.fullName}
                                onChange={(e) => setInputs({ ...inputs, fullName: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="usernameInput">Username</label>
                        <div>
                            <input 
                                id="usernameInput"
                                type="text"
                                placeholder="Username"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg focus:ring-0"
                                value={inputs.username}
                                onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="emailInput">Email Address</label>
                        <div>
                            <input 
                                id="emailInput"
                                type="text"
                                placeholder="Email Address"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg focus:ring-0"
                                value={inputs.email}
                                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="passwordInput">Password</label>
                        <div>
                            <input 
                                id="passwordInput"
                                type="password"
                                placeholder="Password"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg focus:ring-0"
                                value={inputs.password}
                                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                            />
                        </div>
                    </div>
                    <button className="bg-fuchsia-900 py-2 rounded-lg text-white text-md -mb-2">
                        {isLoading ? <Spinner className="fill-white"/> : "Sign Up"}
                    </button>
                    <Link to={"/signin"}>
                        <div className="text-md hover:underline hover:decoration-fuchsia-800 hover:text-fuchsia-800">
                            Already have an account? Sign In
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignUpPage