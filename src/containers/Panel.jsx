import { Stack, StackDivider, Text } from '@chakra-ui/react';
import React from 'react'

function Panel() {
  return (
    <Stack bg="c4" w="100%" h="100%" padding="5px" divider={<StackDivider />}>
        {/** User Profile */}
        <Stack bg="gray.700" w="100%" h="30%" color="white" ><Text>Profile Header</Text></Stack>
        {/** Menus and buttons */}
        <Stack bg="gray.300" w="100%" h="70%" color="black"><Text>Buttons</Text></Stack>
    </Stack>
  )
}

export default Panel;