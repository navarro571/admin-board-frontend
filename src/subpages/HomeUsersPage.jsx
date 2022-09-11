import React, {useContext, useEffect, useState} from "react";
import {
    Box,
    Button, CircularProgress, Container, Icon, Input,
    Stack, StackDivider,
    Table,
    TableContainer,
    Tbody,
    Td, Text,
    Tfoot,
    Th,
    Thead,
    Tr, useDisclosure, VStack
} from "@chakra-ui/react";
import {AiOutlineSearch} from "react-icons/ai";
import UserForm from "../components/UserForm";
import {useLocation, useNavigate} from "react-router-dom";

const HomeUsersPage = () => {
    const { isOpen, onOpen: triggerUserFormulary, onClose } = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();

    const [users, setUsers] = useState();
    const [loading, setLoading] = useState(true);
    const [headers, setHeaders] = useState();
    useEffect(() => {
        const status = fetchData();
        status.then(() => {
            setLoading(false);
        });
        const pathname = location.pathname;
        const search = location.search;
        const params = new URLSearchParams(search);
        const editParam = params.get("edit");
        const createParam = params.get("create");
        if(editParam && createParam) {
            params.delete("edit");
            params.delete("create");
            navigate(`${pathname}?${params}`);
        }
        if(editParam || createParam) {
            triggerUserFormulary();
        }
    }, []);

    const fetchData = async function () {
        const usersRes = await getUsers();

        setUsers(usersRes)
        const user = usersRes[0];
        if (user) {
            setHeaders(Object.keys(user).map(parm => parm.toUpperCase()));
        }
    }

    const getUsers = async function () {
        const url = process.env.REACT_APP_BE_URL;
        const token = sessionStorage.getItem("token");
        const res = await fetch(url + "/api/v1/users/", {
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
        return data.users || [];
    }

    const UserRow = function (user) {
        let values = Object.values(user);
        if (!values) {
            return <></>;
        }
        return (
            <>
                {values.length ? values.map((value, i) => <Td key={i}>{value}</Td>) : <></>}
            </>
        );
    }

    const removeHandle = async function (e) {
        const id = e.target.getAttribute("data-id");
        if(id) {
            setLoading(true);
            const url = process.env.REACT_APP_BE_URL;
            const token = sessionStorage.getItem("token");
            const res = await fetch(url + `/api/v1/users/${id}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `bearer ${token}`,
                }
            });
            if (res.status !== 200) {
                console.error("unauthorized");
                return;
            }
            const users = await getUsers();
            setUsers(users);
            setLoading(false);
        }
    }

    const openEditModal = function (e) {
        const userId = e.target.getAttribute("data-id");
        if(userId) {
            const pathname = location.pathname;
            const search = location.search;
            const params = new URLSearchParams(search);
            if(params.get("create")) {
                params.delete("create");
            }
            params.set("edit", userId);
            let parameters = params.toString();
            navigate(`${pathname}?${parameters}`);
        }
    }

    const openCreateModal = function (e) {
        const pathname = location.pathname;
        const search = location.search;
        const params = new URLSearchParams(search);
        if(params.get("edit")) {
            params.delete("edit");
        }
        params.set("create", true);
        let parameters = params.toString();
        navigate(`${pathname}?${parameters}`);
    }

    const UserFormulary = function (){
        const search = location.search;
        const params = new URLSearchParams(search);
        const userId = params.get("edit");
        if (isOpen && userId) {
            if(users) {
                const user = users.find((user) => user.id == userId);
                if(user) {
                    return (
                        <UserForm isOpen={isOpen} onClose={onClose} userData={user} />
                    )
                }
            }
        } else if (isOpen && !userId) {
            return (
                <UserForm isOpen={isOpen} onClose={onClose} />
            )
        }
        return ( <></> );
    }

    return (
        <Container maxWidth={"100%"} padding={"10px 20px"}>
            <Box>
                <Text fontWeight={"bold"} fontSize={"1.5rem"}>List of Users</Text>
                <Box display={"flex"} flexDir={"row"} justifyContent={"flex-end"} width={"95%"} gap={"10px"} padding={"10px 0px"}>
                    <VStack flexDir={"row"} gap={"5px"} divider={<StackDivider />} border="solid 1px" borderRadius={"5px"} padding={"5px"}>
                        <Input type={"text"} variant={"unstyled"} width={"300px"} border={"none"}></Input>
                        <Icon as={AiOutlineSearch}  w={6} h={6} />
                    </VStack>
                    <Input type={"button"} value={"CREATE"} backgroundColor={"btn_success"} color={"white"}
                           width={"150px"} cursor={"pointer"} onClick={openCreateModal} />
                </Box>
            </Box>
            <Box>
                {loading ? (
                    <>
                        <CircularProgress isIndeterminate/>
                    </>
                ) : (
                    <TableContainer>
                        <Table variant='simple'>
                            <Thead>
                                <Tr>
                                    {headers && headers.length ? headers.map((header, i) => <Th
                                        key={i}>{header}</Th>) : <></>}
                                    <Th>Remove</Th>
                                    <Th>Edit</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {users && users.length ? users.map((user, i) => (
                                    <Tr key={user.id}>
                                        {UserRow(user)}
                                        <Td><Button data-id={user.id} onClick={removeHandle}>Remove</Button></Td>
                                        <Td><Button data-id={user.id} onClick={openEditModal}>Edit</Button></Td>
                                    </Tr>
                                )) : <></>}
                            </Tbody>
                            <Tfoot>
                                <Tr>
                                    {headers && headers.length ? headers.map((header, i) => <Th
                                        key={i}>{header}</Th>) : <></>}
                                    <Th>Remove</Th>
                                    <Th>Edit</Th>
                                </Tr>
                            </Tfoot>
                        </Table>
                    </TableContainer>
                )}
            </Box>

            <UserFormulary />

        </Container>
    )
}

export default HomeUsersPage;