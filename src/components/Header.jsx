import React from 'react';
import { Avatar, Box, Button, Flex, Popover, Portal, Text } from "@chakra-ui/react";
import { GrStepsOption } from "react-icons/gr";
import { useAuth } from '../context/AuthContext';
import { ColorModeButton } from './ui/color-mode';

const AvatarProfile = () => {
  const { signOut } = useAuth();
  return (
    <Flex justify="flex-end" align="center">
      <Popover.Root>
        <Popover.Trigger asChild>
          <Box size="sm" variant="ghost">
            <Avatar.Root size="md">
              <Avatar.Fallback name="Segun Adebayo" />
              <Avatar.Image src="https://bit.ly/sage-adebayo" />
            </Avatar.Root>
          </Box>
        </Popover.Trigger>
        <Portal>
          <Popover.Positioner>
            <Popover.Content>
              <Popover.Arrow />
              <Popover.Body>
                <Popover.Title fontWeight="medium">Name</Popover.Title>
                <Text my="4">
                  Naruto is a Japanese manga series written and illustrated by
                  Masashi Kishimoto.
                </Text>
                <Button onClick={signOut} variant="outline" width="100%" colorPalette={"red"} size="sm">
                  Logout
                </Button>
              </Popover.Body>
            </Popover.Content>
          </Popover.Positioner>
        </Portal>
      </Popover.Root>

    </Flex>)
};

const Header = () => {
  const { user } = useAuth();
  console.log('User:', user);
  return (
    <Flex justify="space-between" align="center" mb="3" gapX="9">
      <GrStepsOption />
      <Box display="flex" gapX="9">
        <ColorModeButton />
        <AvatarProfile />
      </Box>
    </Flex>
  );
};

export default Header;