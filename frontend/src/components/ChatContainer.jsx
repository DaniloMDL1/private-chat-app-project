import ChatHeader from "./ChatHeader"
import ChatMessageContainer from "./ChatMessageContainer"
import MessageInput from "./MessageInput"

const ChatContainer = () => {
    return (
        <div className="flex flex-col h-screen">
            <ChatHeader />
            <div className="flex-1 overflow-y-auto">
                <ChatMessageContainer />
            </div>
            <MessageInput />
        </div>
    )
}

export default ChatContainer