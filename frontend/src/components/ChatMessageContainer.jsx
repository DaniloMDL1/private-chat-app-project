import { useSelector } from "react-redux"
import { useGetConversationMessagesQuery } from "../redux/messages/messagesApi"
import Message from "./Message"
import { Spinner } from "flowbite-react"
import { useEffect, useRef } from "react"

const ChatMessageContainer = () => {
    const { conversation } = useSelector((state) => state.conversations)
    const { socket } = useSelector((state) => state.socket)

    const { data: conversationMessages, isLoading: isConversationMessagesLoading, refetch } = useGetConversationMessagesQuery({ conversationId: conversation?._id })

    const scrollRef = useRef(null)

    useEffect(() => {

        socket?.on("newMessage", (newMessage) => {
            refetch()
        })

        return () => socket?.off("newMessage")
    }, [socket])

    useEffect(() => {
        setTimeout(() => {
            scrollRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [conversationMessages])

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
            {conversationMessages && conversationMessages.map((message) => (
                <div ref={scrollRef} key={message._id} className="flex flex-col gap-4">
                    <Message message={message}/>
                </div>
            ))}
        </div>
    )
}

export default ChatMessageContainer