import { Avatar, Modal, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { IoIosSearch } from "react-icons/io"
import { useSearchUsersQuery } from "../redux/user/usersApi"
import { useNewConversationMutation } from "../redux/conversations/conversationsApi"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"

const SearchUsersInput = () => {
    const { user } = useSelector((state) => state.user)

    const [open, setOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    // search users api
    const { data: searchUsersData, isLoading: isSearchUsersDataLoading } = useSearchUsersQuery({ searchTerm })

    const searchInputTheme = {
        field: {
            input: {
                colors: {
                    gray: "border-gray-300 bg-gray-50 text-gray-900 focus:border-fuchsia-800 focus:ring-fuchsia-800 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-cyan-500 dark:focus:ring-cyan-500"
                }
            }
        }
    }
    
    // new conversation api
    const [ newConversationApi ] = useNewConversationMutation()

    const handleNewConversation = async (receiverId) => {
        try {
            const res = await newConversationApi({ senderId: user._id, receiverId })
            
        } catch(error) {
            if(error.data) {
                toast.error(error.data.error)
            } else {
                toast.error(error.message)
            }
        }
    }

    return (
        <div className="border-b border-zinc-400">
            <div className="p-2">
                <TextInput onClick={() => setOpen(true)} theme={searchInputTheme} placeholder="Search users..." rightIcon={IoIosSearch} sizing={"sm"}/>
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
                            <TextInput autoFocus placeholder="Search users..." theme={searchInputTheme} rightIcon={IoIosSearch} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
                            {isSearchUsersDataLoading && (
                                <div className="flex justify-center mt-4">
                                    <Spinner className="fill-fuchsia-800" size={"lg"}/>
                                </div>
                            )}
                            {!isSearchUsersDataLoading && searchUsersData?.length === 0 && (
                                <div className="flex justify-center mt-4">
                                    <div className="text-lg">
                                        No results found.
                                    </div>
                                </div>
                            )}
                            {searchUsersData && (
                                <div className="flex flex-col">
                                    {searchUsersData.map((searchUser) => (
                                        <div onClick={() => handleNewConversation(searchUser._id)} key={searchUser._id} className="flex items-center gap-3 p-2 hover:bg-fuchsia-900 hover:text-white cursor-pointer rounded-lg">
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
        </div>
    )
}

export default SearchUsersInput