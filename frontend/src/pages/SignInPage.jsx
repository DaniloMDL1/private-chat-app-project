import { useState } from "react"
import { Link } from "react-router-dom"
import { useSignInMutation } from "../redux/user/authApi"
import { toast } from "react-toastify"
import { useDispatch } from "react-redux"
import { signIn } from "../redux/user/userSlice"
import { Spinner } from "flowbite-react"

const SignInPage = () => {
    const [inputs, setInputs] = useState({
        email: "",
        password: ""
    })

    const dispatch = useDispatch()

    // signin api
    const [ signInApi, { isLoading } ] = useSignInMutation()

    const handleSignIn = async (e) => {
        e.preventDefault()
        try {
            const res = await signInApi(inputs).unwrap()

            dispatch(signIn({ ...res }))
            
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
                    Sign In
                </div>
                <form onSubmit={handleSignIn} className="flex flex-col gap-3">
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
                        {isLoading ? <Spinner className="fill-white"/> : "Sign In"}
                    </button>
                    <Link to={"/signup"}>
                        <div className="text-md hover:underline hover:decoration-fuchsia-800 hover:text-fuchsia-800">
                            Don't have an account? Sign Up
                        </div>
                    </Link>
                </form>
            </div>
        </div>
    )
}

export default SignInPage