import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
} from "@nextui-org/react";
  
export const ConfirmModal = ({isOpen, onClose, onConfirm, title, description}) => {

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalContent>
            {(onClose) => (
            <>
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                {description}
                </ModalBody>
                <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                    Hủy bỏ
                </Button>
                <Button color="primary" onPress={onConfirm}>
                    Xác nhận
                </Button>
                </ModalFooter>
            </>
            )}
        </ModalContent>
        </Modal>
    );
}