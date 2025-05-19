import React from 'react';
import { Box, Image, Text, Progress, HStack } from "@chakra-ui/react";
import { motion } from 'framer-motion';

// Create motion components
const MotionBox = motion(Box);
const MotionImage = motion(Image);
const MotionText = motion(Text);
const MotionProgress = motion(Progress.Root);

const NutrientCard = ({ 
  icon, 
  alt, 
  bgColor = "purple.100", 
  value = 40 
}) => {
  return (
    <MotionBox 
      rounded="lg" 
      bg={bgColor} 
      height="150px" 
      width="150px" 
      padding="4" 
      display="flex" 
      flexDir="column" 
      justifyContent="space-between"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ 
        y: -5,
        boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
      }}
    >
      <MotionImage
        src={icon}
        alt={alt}
        width="60px"
        height="60px"
        borderRadius="lg"
        fallbackSrc="https://via.placeholder.com/400"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, duration: 0.3 }}
        whileHover={{ rotate: 10, scale: 1.05 }}
      />
      <MotionText 
        fontSize="sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        Usage
      </MotionText>
      <MotionProgress 
        defaultValue={value} 
        maxW="sm"
        initial={{ width: "0%" }}
        animate={{ width: "100%" }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <HStack gap="5">
          <Progress.Track flex="1">
            <Progress.Range 
              as={motion.div}
              initial={{ width: "0%" }}
              animate={{ width: `${value}%` }}
              transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            />
          </Progress.Track>
          <MotionText
            as={Progress.ValueText}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {value}%
          </MotionText>
        </HStack>
      </MotionProgress>
    </MotionBox>
  );
};

export default NutrientCard;