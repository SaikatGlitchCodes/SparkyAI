import React from 'react';
import { Avatar, Box, Flex } from "@chakra-ui/react";
import { GrStepsOption } from "react-icons/gr";
import { useAuth } from '../context/AuthContext';
import { ColorModeButton } from './ui/color-mode';

const AvatarProfile = () => (
  <Flex justify="flex-end" align="center">
    <Avatar.Root size="md">
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  </Flex>
);

const Header = () => {
  const {user} = useAuth();
  console.log('User:',user);
  return (
    <Flex justify="space-between" align="center" mb="3" gapX="9">
      <GrStepsOption />
      <Box display="flex" gapX="9">
        <ColorModeButton/>
        <AvatarProfile />
      </Box>
    </Flex>
  );
  };

export default Header;