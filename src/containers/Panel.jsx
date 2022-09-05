import {Input, Stack, StackDivider, Text} from '@chakra-ui/react';
import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";

function Panel() {
    const navigate = useNavigate();
    const location = useLocation();
    const pageHandler = (e) => {
        const target = e.target.getAttribute("data-id");
        const pathname = location.pathname;
        const search = location.search;
        const params = new URLSearchParams(search);
        const page = params.get("page");
        if (page != target) {
            params.set("page", target);
        }
        let parameters = params.toString();
        debugger;
        navigate(`${pathname}?${parameters}`);
    }

    return (
        <Stack bg="c4" w="100%" h="100%" divider={<StackDivider margin={"0!important"}/>}>
            {/** User Profile */}
            <Stack bg="gray.700" w="100%" h="30%" color="white" padding={"5px"}><Text>Profile Header</Text></Stack>
            {/** Menus and buttons */}
            <Stack w="100%" h="70%" color="white">
                <Input type={"button"} cursor={'pointer'} value={"OVERVIEW"} data-id="overview" bg={"blackAlpha.600"} border={"none"}
                       borderRadius={0} onClick={pageHandler}></Input>
                <Input type={"button"} cursor={'pointer'} value={"USERS"} data-id="users" bg={"blackAlpha.600"} border={"none"}
                       borderRadius={0} onClick={pageHandler}></Input>
            </Stack>
        </Stack>
    )
}

export default Panel;