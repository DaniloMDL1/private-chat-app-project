import { Avatar, TextInput } from "flowbite-react"
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import { useSelector } from "react-redux";
import { useCreateMessageMutation } from "../redux/messages/messagesApi";
import { toast } from "react-toastify";

const MessageInput = () => {
    const { user } = useSelector((state) => state.user)
    const { conversation } = useSelector((state) => state.conversations)

    const [message, setMessage] = useState("")

    const searchInputTheme = {
        field: {
            input: {
                colors: {
                    gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-fuchsia-800 focus:ring-fuchsia-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                }
            }
        }
    }

    const receiverId = conversation.participants.find((id) => id !== user._id )

    const [ createMessageApi ] = useCreateMessageMutation()

    const handleCreateMessage = async (e) => {
        e.preventDefault()
        if(!message.trim()) {
            toast.error("You must type something")
            return
        }
        try {
            const res = await createMessageApi({ conversationId: conversation?._id, senderId: user._id, message, receiverId }).unwrap()

            setMessage("")
            
        } catch(error) {
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={handleCreateMessage} className="flex items-center justify-center gap-2 py-3 border-t border-slate-100">
            <Avatar img={user.profilePicture} size={"md"} rounded/>
            <TextInput type="text" value={message} onChange={(e) => setMessage(e.target.value)} theme={searchInputTheme} placeholder="Type something..." className="w-[420px]"/>
            <button>
                <IoMdSend type="button" size={28} className="text-fuchsia-900 cursor-pointer"/>
            </button>
        </form>
    )
}

export default MessageInput