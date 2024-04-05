import { Avatar } from "flowbite-react"
import { useDispatch, useSelector } from "react-redux"
import { useGetUserQuery } from "../redux/user/usersApi"
import { setConversation, setSelectedConversation } from "../redux/conversations/conversationsSlice"

const Conversation = ({ conversation }) => {
    const { user } = useSelector((state) => state.user)
    const { selectedConversation } = useSelector((state) => state.conversations)
    const { onlineUsers } = useSelector((state) => state.socket)
    const dispatch = useDispatch()

    const otherUserId = conversation.participants.find((id) => id !== user._id )
    
    const isOnline = onlineUsers.includes(otherUserId)
    
    const { data: userData } = useGetUserQuery({ userId: otherUserId })

    if(!userData) return null

    return (
        <div onClick={() => {
            dispatch(setSelectedConversation(otherUserId))
            dispatch(setConversation(conversation))
        }} className={`flex items-center gap-3 p-3 hover:bg-fuchsia-900 text-white cursor-pointer ${selectedConversation === otherUserId ? "bg-fuchsia-900" : ""}`}>
            <Avatar img={userData.profilePicture} size={"md"} rounded status={isOnline && "online"} statusPosition="top-right"/>
            <div className="text-md">{userData.username}</div>
        </div>
    )
}

export default Conversation