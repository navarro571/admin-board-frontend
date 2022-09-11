import { Stack, Text } from '@chakra-ui/react'
import React, {useContext, useEffect} from 'react'
import {useLocation} from "react-router-dom";
import HomeOverviewPage from "../subpages/HomeOverviewPage";
import HomeUsersPage from "../subpages/HomeUsersPage";

function HomeContentContainer() {
    const location = useLocation();
    const CurrentPage = () => {
        const search = location.search;
        const params = new URLSearchParams(search);
        const page = params.get("page");
        let subpage = <HomeOverviewPage />;
        switch (page) {
            case "overview":
                subpage = <HomeOverviewPage />
                break;
            case "users":
                subpage = <HomeUsersPage />
                break;
        }
        return subpage;
    }

    return (
        <Stack bg="white" w="100%" h="100%">
            <CurrentPage />
        </Stack>
    )
}

export default HomeContentContainer