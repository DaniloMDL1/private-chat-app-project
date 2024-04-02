import { useState } from "react"
import { toast } from "react-toastify"

const usePreviewImg = () => {
    const [imgUrl, setImgUrl] = useState(null)

    const handleImgChange = (e) => {
        const file = e.target.files[0]

        if(file && file.type.startsWith("image/")) {
            const reader = new FileReader()

            reader.onloadend = () => {
                setImgUrl(reader.result)
            }

            reader.readAsDataURL(file)

        } else {
            toast.error("You must select an image file.")
            setImgUrl(null)
        }
    }

    return {
        imgUrl,
        handleImgChange
    }
}

export default usePreviewImg