import React, {useContext, useEffect, useState} from "react";
import {
    Button, CircularProgress,
    Stack,
    Table,
    TableContainer,
    Tbody,
    Td,
    Tfoot,
    Th,
    Thead,
    Tr
} from "@chakra-ui/react";
import AppContext from "../contexts/AppContext";

const HomeUsersPage = () => {
    const appContext = useContext(AppContext);
    const [users, setUsers] = useState();
    const [roles, setRoles] = useState();
    const [loading, setLoading] = useState(true);
    const [headers, setHeaders] = useState();
    useEffect( () => {
        const status = fetchData();
        status.then(() => {
            setLoading(false);
        })
    }, []);

    const fetchData = async function () {
        const usersRes = await getUsers();
        const rolesRes = await getRoles();

        setUsers(usersRes)
        const user = usersRes[0];
        if (user) {
            setHeaders(Object.keys(user).map(parm => parm.toUpperCase()));
        }

        setRoles(rolesRes);
    }

    const getUsers = async function () {
        const url = process.env.REACT_APP_BE_URL;
        const res = await fetch(url + "/api/v1/users/", {
            method: "GET",
            headers: {
                "Authorization": `bearer ${appContext.sessionToken}`,
            }
        });
        if(res.status !== 200) {
            console.error("unauthorized");
            return;
        }
        const data = await res.json();
        return data.users || [];
    }

    const getRoles = async function () {
        const url = process.env.REACT_APP_BE_URL;
        const res = await fetch(url + "/api/v1/roles/", {
            method: "GET",
            headers: {
                "Authorization": `bearer ${appContext.sessionToken}`,
            }
        });
        if(res.status !== 200) {
            console.error("unauthorized");
            return;
        }
        const data = await res.json();
        return data.roles || [];
    }

    const userRow = function (user) {
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

    return (
        <Stack>
            { loading ? (
                <>
                    <CircularProgress isIndeterminate />
                </>
            ): (
                <TableContainer>
                    <Table variant='simple'>
                        <Thead>
                            <Tr>
                                {headers && headers.length ? headers.map((header, i) => <Th key={i}>{header}</Th>) : <></>}
                                <Th>Remove</Th>
                                <Th>Edit</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {users && users.length ? users.map((user, i) => (
                                <Tr key={i}>
                                    { userRow(user) }
                                    <Td><Button>Remove</Button></Td>
                                    <Td><Button>Edit</Button></Td>
                                </Tr>
                            )) : <></>}
                        </Tbody>
                        <Tfoot>
                            <Tr>
                                {headers && headers.length ? headers.map((header, i) => <Th key={i}>{header}</Th>) : <></>}
                                <Th>Remove</Th>
                                <Th>Edit</Th>
                            </Tr>
                        </Tfoot>
                    </Table>
                </TableContainer>
            )}

        </Stack>
    )
}

export default HomeUsersPage;