import { useDispatch, useSelector } from "react-redux"
import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar"
import { useEffect } from "react"
import { setSelectedConversation } from "../redux/conversations/conversationsSlice"

const HomePage = () => {
    const { selectedConversation } = useSelector((state) => state.conversations)
    const dispatch = useDispatch()

    useEffect(() => {
        
        return () => dispatch(setSelectedConversation(null))
    }, [dispatch])
    

    return (
        <div className="flex">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4">
                {selectedConversation ? (
                    <ChatContainer />
                ) : (
                    <div className="text-4xl text-fuchsia-950 flex justify-center items-center h-screen">
                        Select a chat to start a conversation.
                    </div>
                )}
            </div>
        </div>
    )
}

export default HomePage