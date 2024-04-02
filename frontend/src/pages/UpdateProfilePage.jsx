import { Avatar, Spinner } from "flowbite-react"
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useUpdateProfileMutation } from "../redux/user/usersApi"
import { toast } from "react-toastify"
import usePreviewImg from "../hooks/usePreviewImg"
import { updateProfile } from "../redux/user/userSlice"

const UpdateProfilePage = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const [inputs, setInputs] = useState({
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        password: ""
    })

    const userAvatarRef = useRef(null)

    // usepreviewimg hook
    const { imgUrl, handleImgChange } = usePreviewImg()

    // update user api
    const [ updateProfileApi, { isLoading } ] = useUpdateProfileMutation()

    const handleUpdateProfile = async (e) => {
        e.preventDefault()
        try {
            const res = await updateProfileApi({ ...inputs, userId: user._id, profilePicture: imgUrl }).unwrap()

            dispatch(updateProfile({ ...res }))
            toast.success("Profile has been successfully updated.")
            
        } catch(error) {
            if(error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen">
            <form onSubmit={handleUpdateProfile} className="border border-slate-300 max-sm:w-[300px] sm:w-[420px] p-3">
                <div className="text-2xl font-medium text-center">Update Profile</div>
                <div className="flex items-center gap-4">
                    <Avatar img={imgUrl || user.profilePicture} rounded size={"lg"}/>
                    <input type="file" hidden ref={userAvatarRef} onChange={handleImgChange}/>
                    <button type="button" onClick={() => userAvatarRef.current.click()} className="bg-fuchsia-900 text-white p-2 rounded-md">Change Avatar</button>
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
                    <button className="bg-fuchsia-900 text-white p-2 rounded-md w-full">
                        {isLoading ? <Spinner className="fill-white"/> : "Update Profile"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default UpdateProfilePage