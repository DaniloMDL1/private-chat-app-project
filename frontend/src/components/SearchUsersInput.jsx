import { Avatar, Modal, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { useSearchUsersQuery } from "../redux/user/usersApi"

const SearchUsersInput = () => {
    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // search users api
    const { data: searchUsersData, isLoading: isSearchUsersDataLoading } = useSearchUsersQuery({ searchTerm })

    return (
        <div className="p-3">
            <TextInput onClick={() => setOpen(true)} placeholder="Search users..." rightIcon={IoIosSearch} sizing={"sm"}/>
            <Modal
                show={open}
                onClose={() => setOpen(false)}
                size={"xl"}
            >
                <Modal.Header>
                    Search for users
                </Modal.Header>
                <Modal.Body>
                    <div className="p-2 h-[300px]">
                        <TextInput autoFocus placeholder="Search users..." rightIcon={IoIosSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                        {isSearchUsersDataLoading && (
                            <div className="flex justify-center mt-4">
                                <Spinner className="fill-fuchsia-800" size={"lg"}/>
                            </div>
                        )}
                        {!isSearchUsersDataLoading && searchUsersData.length === 0 && (
                            <div className="flex justify-center mt-4">
                                <div className="text-lg">
                                    No results found.
                                </div>
                            </div>
                        )}
                        {searchUsersData && (
                            <div className="flex flex-col">
                                {searchUsersData.map((searchUser) => (
                                    <div key={searchUser._id} className="flex items-center gap-3 p-2 hover:bg-fuchsia-900 hover:text-white cursor-pointer rounded-lg">
                                        <Avatar img={searchUser.profilePicture} size={"md"} rounded/>
                                        <div className="text-md">{searchUser.username}</div>
                                    </div>
                                ))}
                            </div>
                        )} 
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default SearchUsersInput