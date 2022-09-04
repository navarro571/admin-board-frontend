import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Grid } from '@chakra-ui/react';
import Panel from '../containers/Panel';
import Header from '../components/Header';
import HomeContentContainer from '../containers/HomeContentContainer';

function Home() {
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const sessionToken = location.state?.sessionToken;
        if (!sessionToken) {
          navigate("/");
        }
    })
  return (
    <Grid width="100vw" height="100vh" gridTemplateColumns="10% 90%" gridTemplateRows="5% 95%">
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
  )
}

export default Home;