import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { GiFarmTractor } from "react-icons/gi";
import MapComponent from './GoogleMap';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const FarmManagement = () => {
  return (
    <MotionBox 
      mt="6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <MotionText 
        fontSize="xl" 
        mb="4" 
        display="flex" 
        gapX="3"
        initial={{ x: -20 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        Manage your farm <GiFarmTractor size="1.5em" />
      </MotionText>
      <MotionBox
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ boxShadow: "lg" }}
      >
        <MapComponent />
      </MotionBox>
    </MotionBox>
  );
};

export default FarmManagement;