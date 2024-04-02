import SearchUsersInput from "./SearchUsersInput"
import SidebarHeader from "./SidebarHeader"

const Sidebar = () => {
    return (
        <div className="bg-fuchsia-950 min-h-screen">
            <SidebarHeader />
            <SearchUsersInput />
        </div>
    )
}

export default Sidebar