import { useSelector } from "react-redux"
import { useGetConversationsQuery } from "../redux/conversations/conversationsApi"
import SearchUsersInput from "./SearchUsersInput"
import SidebarHeader from "./SidebarHeader"
import Conversation from "./Conversation"
import { Spinner } from "flowbite-react"

const Sidebar = () => {
    const { user } = useSelector((state) => state.user)

    const { data: conversationsData, isLoading } = useGetConversationsQuery({ userId: user._id })

    return (
        <div className="bg-fuchsia-950 h-screen">
            <SidebarHeader />
            <SearchUsersInput />
            {isLoading && (
                <div className="flex justify-center mt-2">
                    <Spinner className="fill-white"/>
                </div>
            )}
            {!isLoading && conversationsData?.length === 0 && (
                <div className="text-sm text-center text-white mt-4">
                    You haven't started any conversation yet.
                </div>
            )}
            <div className="sidebar-conv flex flex-col">
                {conversationsData && conversationsData.map((c) => (
                    <Conversation key={c._id} conversation={c}/>
                ))}
            </div>
        </div>
    )
}

export default Sidebar