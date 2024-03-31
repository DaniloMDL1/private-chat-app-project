import ChatContainer from "../components/ChatContainer"
import Sidebar from "../components/Sidebar"

const HomePage = () => {
    return (
        <div className="flex">
            <div className="w-1/4">
                <Sidebar />
            </div>
            <div className="w-3/4">
                <ChatContainer />
            </div>
        </div>
    )
}

export default HomePage