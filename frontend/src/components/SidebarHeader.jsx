import { Avatar, Dropdown, Spinner } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { useSignOutMutation } from "../redux/user/authApi"
import { signOut } from "../redux/user/userSlice"
import { toast } from "react-toastify"

const SidebarHeader = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    // signout api
    const [ signOutApi, { isLoading } ] = useSignOutMutation()

    const handleSignOut = async () => {
        try {
            const res = await signOutApi().unwrap()

            dispatch(signOut())
            toast.success("You have been successfully signed out.")
            
        } catch(error) {
            console.error("Error: " + error.message)
        }
    }

    return (
        <div className="border-b border-zinc-400">
            <div className="px-2 py-4">
                <div className="flex items-center gap-3">
                    <Dropdown
                        label={<Avatar img={user.profilePicture} rounded size={"md"}/>}
                        arrowIcon={false}
                        inline
                        className="w-[200px]"
                    >
                        <Dropdown.Item as={Link} to={"/update-profile"}>Update Profile</Dropdown.Item>
                        <Dropdown.Divider className="my-0"/>
                        <Dropdown.Item onClick={handleSignOut}>
                            {isLoading ? <Spinner className="fill-black" size={"sm"}/> : "Sign Out"}
                        </Dropdown.Item>
                    </Dropdown>
                    <div className="text-white truncate">{user.username}</div>
                </div>
            </div>
        </div>
    )
}

export default SidebarHeader