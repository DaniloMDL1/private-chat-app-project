import { useSelector } from "react-redux"
import { useGetConversationMessagesQuery } from "../redux/messages/messagesApi"
import Message from "./Message"
import { Spinner } from "flowbite-react"

const ChatMessageContainer = () => {
    const { conversation } = useSelector((state) => state.conversations)

    const { data: conversationMessages, isLoading: isConversationMessagesLoading } = useGetConversationMessagesQuery({ conversationId: conversation?._id })

    return (
        <div className="p-3">
            {isConversationMessagesLoading && (
                <div className="flex justify-center mt-2">
                    <Spinner className="fill-white"/>
                </div>
            )}
            {!isConversationMessagesLoading && conversationMessages?.length === 0 && (
                <div className="text-xl text-center text-fuchsia-950">
                    Type something to start a conversation.
                </div>
            )}
            <div className="flex flex-col gap-4">
                {conversationMessages && conversationMessages.map((message) => (
                    <Message key={message._id} message={message}/>
                ))}
            </div>
        </div>
    )
}

export default ChatMessageContainer