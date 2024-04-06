import { Modal, Button, Spinner } from "flowbite-react"

const DeleteMessageModal = ({ openModal, setOpenModal, isLoading, handleDeleteMessage }) => {
    return (
        <Modal size={"sm"} show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header></Modal.Header>
        <Modal.Body>
            <div className="text-md">
                Are you sure about deleting this message?
            </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleDeleteMessage} className="bg-red-600 enabled:hover:bg-red-700 w-[140px]">
            {isLoading ? <Spinner size={"sm"} className="fill-white"/> : "Yes, delete"}
          </Button>
          <Button className="bg-slate-500 enabled:hover:bg-slate-600" onClick={() => setOpenModal(false)}>
            Cancel
          </Button>
        </Modal.Footer>
      </Modal>
    )
}

export default DeleteMessageModal