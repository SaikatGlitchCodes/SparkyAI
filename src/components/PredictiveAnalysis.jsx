import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { IoAnalytics } from "react-icons/io5";
import ChartGraph from './ChartGraph';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const PredictiveAnalysis = () => {
  return (
    <MotionBox 
      mt="6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
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
        Predictive Analysis <IoAnalytics size="1.5em" />
      </MotionText>
      <MotionBox
        initial={{ scale: 0.95, opacity: 0.8 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        whileHover={{ 
          boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
          y: -2
        }}
      >
        <ChartGraph />
      </MotionBox>
    </MotionBox>
  );
};

export default PredictiveAnalysis;