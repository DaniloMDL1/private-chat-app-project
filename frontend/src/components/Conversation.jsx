import { Avatar } from "flowbite-react"
import { useSelector } from "react-redux"
import { useGetUserQuery } from "../redux/user/usersApi"

const Conversation = ({ conversation }) => {
    const { user } = useSelector((state) => state.user)

    const otherUserId = conversation.participants.find((id) => id !== user._id )
    
    const { data: userData } = useGetUserQuery({ userId: otherUserId })

    if(!userData) return null

    return (
        <div className="flex items-center gap-3 p-3 hover:bg-fuchsia-900 text-white cursor-pointer">
            <Avatar img={userData.profilePicture} size={"md"} rounded/>
            <div className="text-md">{userData.username}</div>
        </div>
    )
}

export default Conversation