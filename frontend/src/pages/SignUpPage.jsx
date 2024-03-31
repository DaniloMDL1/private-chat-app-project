import { Link } from "react-router-dom"

const SignUpPage = () => {
    return (
        <div className="min-h-screen flex justify-center items-center font-roboto">
            <div className="border border-slate-200 p-3 max-sm:w-[280px] w-[340px]">
                <div className="text-2xl font-medium text-center">
                    Sign Up
                </div>
                <form className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="fullNameInput">Full Name</label>
                        <div>
                            <input 
                                id="fullNameInput"
                                type="text"
                                placeholder="Full Name"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg"
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
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg"
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
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg"
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
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg"
                            />
                        </div>
                    </div>
                    <button className="bg-fuchsia-900 py-2 rounded-lg text-white text-md -mb-2">
                        Sign Up
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