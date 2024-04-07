import { Avatar, Dropdown } from "flowbite-react"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { useGetUserQuery } from "../redux/user/usersApi"
import { BsThreeDotsVertical } from "react-icons/bs";
import { useState } from "react";
import DeleteMessageModal from "./DeleteMessageModal";
import { useDeleteMessageMutation } from "../redux/messages/messagesApi"
import { toast } from "react-toastify"

const Message = ({ message }) => {
    const { user } = useSelector((state) => state.user)

    const [openModal, setOpenModal] = useState(false)

    const { data: userData } = useGetUserQuery({ userId: message.senderId })

    const [ deleteMessageApi, { isLoading: isDeleteMessageLoading } ] = useDeleteMessageMutation()

    const handleDeleteMessage = async () => {
        try {
            const res = await deleteMessageApi({ messageId: message._id }).unwrap()

            toast.success("Message has been successfully deleted.")
            
        } catch(error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            {message.senderId === user._id ? (
                <div className="flex items-center flex-row-reverse gap-3 mb-5">
                    <div className="text-sm">
                        {format(new Date(message.createdAt), "hh:mm a")}
                    </div>
                    <div className="bg-fuchsia-900 text-white p-4 text-sm rounded-lg max-w-max">
                        {message.message}
                    </div>
                    <Dropdown label={<BsThreeDotsVertical size={16}/>} inline arrowIcon={false} className="w-[100px]">
                        <Dropdown.Item onClick={() => setOpenModal(true)}>
                            Delete
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            ) : (
                <div className="flex items-center mb-5">
                    <div className="flex items-center gap-2 w-5/6">
                        <Avatar img={userData?.profilePicture} size={"md"} rounded/>
                        <div className="bg-zinc-100 text-black p-4 text-sm rounded-lg">
                            {message.message}
                        </div>
                    </div>
                    <div className="text-sm w-2/6 text-right">
                        {format(new Date(message.createdAt), "hh:mm a")}
                    </div>
                </div>
            )}
            <DeleteMessageModal openModal={openModal} setOpenModal={setOpenModal} isLoading={isDeleteMessageLoading} handleDeleteMessage={handleDeleteMessage}/>
        </>
    )
}

export default Message