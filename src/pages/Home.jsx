import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';
import Panel from '../containers/Panel';
import Header from '../components/Header';
import HomeContentContainer from '../containers/HomeContentContainer';
import AppContext from "../contexts/AppContext";

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    let [token, setToken] = useState();

    useEffect(() => {
        const sessionToken = location.state?.sessionToken;
        const sessionStorageToken = sessionStorage.getItem("token");
        if (sessionToken) {
            sessionStorage.setItem("token", sessionToken);
            setToken(sessionToken);
        } else if (!sessionToken && !sessionStorageToken) {
            navigate("/")
        }
    })
  return (
    <AppContext.Provider value={ { sessionToken: token } }>
        <Grid width="100vw" height="100vh" gridTemplateColumns="15% 85%" gridTemplateRows="5% 95%">
            {/** PANEL */}
            <Box gridRow="span 2" h="100%" shadow="base" w="100%" bg="c4">
                <Panel />
            </Box>
            {/** HEADER */}
            <Box gridColumn="2" w="100%" shadow="base" h="100%" bg="c3">
                <Header />
            </Box>
            {/** CONTENT */}
            <Box gridColumn="2" gridRow="2" w="100%" h="100%" bg="white">
                <HomeContentContainer />
            </Box>
        </Grid>
    </AppContext.Provider>
  )
}

export default Home;