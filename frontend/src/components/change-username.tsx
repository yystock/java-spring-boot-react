import React, { useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { Button, Input } from "@nextui-org/react";
import toast from "react-hot-toast";
import { api } from "../api/axiosConfig";
interface ChangeUserNameProps {
  userName: string;
  email: string;
  update: (email: string, newUserName: string) => void;
}
export default function ChangeUserName({ userName, email, update }: ChangeUserNameProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [updatedUserName, setUpdatedUserName] = useState(userName);

  const onEdit = async () => {
    try {
      const response = await api({ method: "put", url: "/user", data: { email: email, userName: updatedUserName } });
      console.log(response.data);
      update(email, updatedUserName);
      onOpenChange();
    } catch (error) {
      console.log(error);
      toast.error("Something wrong3!");
    }
  };
  return (
    <>
      <Button color="secondary" onPress={onOpen}>
        Edit
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Modal Title</ModalHeader>
              <ModalBody>
                <p>New UserName:</p>
                <Input type="text" label="UserName" value={updatedUserName} onValueChange={setUpdatedUserName} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>

                <Button color="primary" onPress={() => onEdit()}>
                  Change
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
