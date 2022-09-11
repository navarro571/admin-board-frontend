import React, {useEffect, useState} from "react";
import {
    Button,
    FormControl, FormLabel, Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent, ModalFooter,
    ModalHeader,
    ModalOverlay, Select
} from "@chakra-ui/react";

const UserForm = ({ isOpen, onClose, userData }) => {
    const [roles, setRoles] = useState();
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        fetchData();

        setEditMode(userData != null);
    })

    const fetchData = async function () {
        const rolesRes = await getRoles();
        setRoles(rolesRes);
    }

    const getRoles = async function () {
        const url = process.env.REACT_APP_BE_URL;
        const token = sessionStorage.getItem("token");
        const res = await fetch(url + "/api/v1/roles/", {
            method: "GET",
            headers: {
                "Authorization": `bearer ${token}`,
            }
        });
        if (res.status !== 200) {
            console.error("unauthorized");
            return;
        }
        const data = await res.json();
        return data.roles || [];
    }
    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{`${editMode ? "Edit" : "Create"} account`}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <FormControl>
                            <FormLabel>First name</FormLabel>
                            <Input placeholder='First name' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Last name</FormLabel>
                            <Input placeholder='Last name' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder='Email' />
                        </FormControl>
                        <FormControl mt={4}>
                            <FormLabel>Role</FormLabel>
                            <Select placeholder='Role'>

                            </Select>
                        </FormControl>
                        { editMode == false ? (
                            <>
                                <FormControl mt={4}>
                                    <FormLabel>Password</FormLabel>
                                    <Input placeholder='Password' />
                                </FormControl>
                                <FormControl mt={4}>
                                    <FormLabel>Repeat password</FormLabel>
                                    <Input placeholder='Repeat password' />
                                </FormControl>
                            </>
                        ): <></>}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3}>
                            Save
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}

export default UserForm;