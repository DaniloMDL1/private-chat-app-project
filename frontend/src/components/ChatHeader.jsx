import { Avatar } from "flowbite-react"
import { useSelector, useDispatch } from "react-redux"
import { useGetUserQuery } from "../redux/user/usersApi"
import { IoIosArrowBack } from "react-icons/io";
import { setSelectedConversation } from "../redux/conversations/conversationsSlice"

const ChatHeader = () => {
  const { selectedConversation } = useSelector((state) => state.conversations)
  const dispatch = useDispatch()

  const { data: userData } = useGetUserQuery({ userId: selectedConversation })

  return (
    <div className="py-4 px-3 border-b border-b-slate-100">
      <div className="flex items-center gap-4">
        <div onClick={() => dispatch(setSelectedConversation(null))} className="md:hidden">
          <IoIosArrowBack size={24}/>
        </div>
        <Avatar img={userData?.profilePicture} size={"md"} rounded/>
        <div className="text-md">{userData?.fullName}</div>
      </div>
    </div>
  )
}

export default ChatHeader