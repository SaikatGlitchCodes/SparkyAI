import React from 'react';
import { Box, Text, Flex } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { PiConfettiLight, PiPlantThin } from "react-icons/pi";
import SummaryCard from './SummaryCard';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const SummarySection = ({ 
  cards, 
  selectedCrop, 
  setSelectedCrop, 
  setAddNewCrop, 
  addNewCrop 
}) => {
  return (
    <>
      <Text mb="4" fontSize="xl" display="flex" gapX="2">
        Summary <PiConfettiLight size="1.3em" />
      </Text>
      <Flex gap="5" flexWrap="wrap">
        {cards.map(card => (
          <Box width={{base:"100%", md: 96}} onClick={() => setSelectedCrop(card)} key={card.id}>
            <SummaryCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              value={card.value}
              unit={card.unit}
              progress={card.progress}
              colorScheme={card.colorScheme}
              selected={selectedCrop.id === card.id}
            />
          </Box>
        ))}

        <MotionBox
          width={{ base: "100%", md: "96" }}
          padding="12px"
          rounded="md"
          display="flex"
          justifyContent="center"
          alignItems="center"
          borderStyle="dashed"
          borderColor="gray.300"
          borderWidth="2px"
          cursor="pointer"
          onClick={() => setAddNewCrop(!addNewCrop)}
          _hover={{ borderColor: "gray.400" }}
          transition={{ type: "spring", stiffness: 300 }}
          whileHover={{ 
            scale: 1.05, 
            borderColor: "black.400",
          }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <MotionText 
            color="gray.500" 
            fontSize="lg" 
            display="flex" 
            alignItems="center" 
            gapX="3"
            whileHover={{ color: "green.500" }}
          >
            Add New Crop <PiPlantThin size="1.5em" style={{ marginLeft: '8px' }}/>
          </MotionText>
        </MotionBox>
      </Flex>
    </>
  );
};

export default SummarySection;