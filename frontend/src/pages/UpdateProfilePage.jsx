import { Avatar } from "flowbite-react"

const UpdateProfilePage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <form className="border border-slate-300 max-sm:w-[300px] sm:w-[420px] p-3">
                <div className="text-2xl font-medium text-center">Update Profile</div>
                <div className="flex items-center gap-4">
                    <Avatar rounded size={"lg"}/>
                    <input type="file" hidden/>
                    <button className="bg-fuchsia-900 text-white p-2 rounded-md">Change Avatar</button>
                </div>
                <div className="flex flex-col gap-3">
                    <div>
                        <label htmlFor="fullNameInput">Full Name</label>
                        <div>
                            <input 
                                id="fullNameInput"
                                type="text"
                                placeholder="Full Name"
                                className="w-full py-1.5 border border-slate-300 outline-none px-2 focus:border-fuchsia-800 rounded-lg focus:ring-0"
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
                            />
                        </div>
                    </div>
                    <button className="bg-fuchsia-900 text-white p-2 rounded-md w-full">Update Profile</button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfilePage