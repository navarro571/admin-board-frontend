import React, {useContext, useEffect, useState} from "react";
import {Stack, Text} from "@chakra-ui/react";
import AppContext from "../contexts/AppContext";

const HomeUsersPage = () => {
    const appContext = useContext(AppContext);
    const [users, setUsers] = useState();
    useEffect( () => {
        const res = getUsers();
        res.then((users) => {
            setUsers(users)
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
            <Text>{users ? JSON.stringify(users) : ""}</Text>
        </Stack>
    )
}

export default HomeUsersPage;