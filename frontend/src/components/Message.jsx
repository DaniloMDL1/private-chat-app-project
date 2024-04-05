import { Avatar } from "flowbite-react"
import { useSelector } from "react-redux"
import { format } from "date-fns"
import { useGetUserQuery } from "../redux/user/usersApi"

const Message = ({ message }) => {
    const { user } = useSelector((state) => state.user)

    const { data: userData } = useGetUserQuery({ userId: message.senderId })

    return (
        <>
            {message.senderId === user._id ? (
                <div className="flex items-center flex-row-reverse gap-3 mt-5">
                    <div className="text-sm">
                        {format(new Date(message.createdAt), "hh:mm a")}
                    </div>
                    <div className="bg-fuchsia-900 text-white p-4 text-sm rounded-lg max-w-max">
                        {message.message}
                    </div>
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
        </>
    )
}

export default Message