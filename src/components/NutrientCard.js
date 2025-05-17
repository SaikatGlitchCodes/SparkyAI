import React from 'react';
import { Box, Image, Text, Progress, HStack } from "@chakra-ui/react";

const NutrientCard = ({ 
  icon, 
  alt, 
  bgColor = "purple.100", 
  value = 40 
}) => {
  return (
    <Box 
      rounded="lg" 
      bg={bgColor} 
      height="150px" 
      width="150px" 
      padding="4" 
      display="flex" 
      flexDir="column" 
      justifyContent="space-between"
    >
      <Image
        src={icon}
        alt={alt}
        width="60px"
        height="60px"
        borderRadius="lg"
        fallbackSrc="https://via.placeholder.com/400"
      />
      <Text fontSize="sm">Usage</Text>
      <Progress.Root defaultValue={value} maxW="sm">
        <HStack gap="5">
          <Progress.Track flex="1">
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>{value}%</Progress.ValueText>
        </HStack>
      </Progress.Root>
    </Box>
  );
};

export default NutrientCard;