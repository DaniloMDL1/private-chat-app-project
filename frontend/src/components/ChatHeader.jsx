import { Avatar } from "flowbite-react"
import { useSelector } from "react-redux"
import { useGetUserQuery } from "../redux/user/usersApi"

const ChatHeader = () => {
  const { selectedConversation } = useSelector((state) => state.conversations)

  const { data: userData } = useGetUserQuery({ userId: selectedConversation })

  return (
    <div className="py-4 px-3 border-b border-b-slate-100">
      <div className="flex items-center gap-4">
        <Avatar img={userData?.profilePicture} size={"md"} rounded/>
        <div className="text-md">{userData?.fullName}</div>
      </div>
    </div>
  )
}

export default ChatHeader