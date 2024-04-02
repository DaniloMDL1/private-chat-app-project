import { Avatar, Dropdown } from "flowbite-react"
import { Link } from "react-router-dom"

const SidebarHeader = () => {
    return (
        <div className="border-b border-zinc-400">
            <div className="px-2 py-4">
                <div className="flex items-center gap-3">
                    <Dropdown
                        label={<Avatar img="https://m.media-amazon.com/images/M/MV5BM2YwYTkwNjItNGQzNy00MWE1LWE1M2ItOTMzOGI1OWQyYjA0XkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_FMjpg_UX1000_.jpg" rounded size={"md"}/>}
                        arrowIcon={false}
                        inline
                        className="w-[200px]"
                    >
                        <Dropdown.Item as={Link} to={"/update-profile"}>Update Profile</Dropdown.Item>
                        <Dropdown.Divider className="my-0"/>
                        <Dropdown.Item>Sign Out</Dropdown.Item>
                    </Dropdown>
                    <div className="text-white truncate">Username</div>
                </div>
            </div>
        </div>
    )
}

export default SidebarHeader