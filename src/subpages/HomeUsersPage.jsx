import React, {useContext, useEffect, useState} from "react";
import {Stack, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr} from "@chakra-ui/react";
import AppContext from "../contexts/AppContext";

const HomeUsersPage = () => {
    const appContext = useContext(AppContext);
    const [users, setUsers] = useState();
    const [headers, setHeaders] = useState();
    useEffect( () => {
        const res = getUsers();
        res.then((users) => {
            setUsers(users)
            const user = users[0];
            if (user) {
                setHeaders(Object.keys(user));
            }
        });
    }, []);

    const getUsers = async function () {
        const url = process.env.REACT_APP_BE_URL;
        const token = appContext.sessionToken;
        const res = await fetch(url + "/api/v1/users/", {
            method: "GET",
            headers: {
                "Authorization": `bearer ${appContext.sessionToken}`,
            }
        });
        if(res.status != 200) {
            console.log("unauthorized");
            return;
        }
        const data = await res.json();
        return data.users || [];
    }
    return (
        <Stack>
            <TableContainer>
                <Table variant='simple'>
                    <Thead>
                        <Tr>
                            {headers && headers.length ? headers.map(header => <Th>{header}</Th>) : <></>}
                        </Tr>
                    </Thead>
                    <Tbody>
                        {users && users.length ? users.map(user => (
                            <Tr>
                                {Object.values(user)?.length ? Object.values(user).map(value => <Td>{value}</Td>) : <></>}
                            </Tr>
                        )) : <></>}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            {headers && headers.length ? headers.map(header => <Th>{header}</Th>) : <></>}
                        </Tr>
                    </Tfoot>
                </Table>
            </TableContainer>
        </Stack>
    )
}

export default HomeUsersPage;