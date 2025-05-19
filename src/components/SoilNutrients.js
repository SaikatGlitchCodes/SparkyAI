import React from 'react';
import { Box, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import NutrientCard from './NutrientCard';

// Import icons - make sure paths match your actual project structure
import PotassiumIcon from '../assets/potassium.png';
import CalciumIcon from '../assets/calcium.png';
import NitrogenIcon from '../assets/nitrogen.png';

// Create motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);

// Container animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

// Item animation variants
const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 100 }
  }
};

const SoilNutrients = () => {
  const nutrients = [
    {
      id: 1,
      icon: PotassiumIcon,
      alt: "Potassium Levels",
      bgColor: "yellow.100",
      value: 40
    },
    {
      id: 2,
      icon: CalciumIcon,
      alt: "Calcium Levels",
      bgColor: "pink.100",
      value: 40
    },
    {
      id: 3,
      icon: NitrogenIcon,
      alt: "Nitrogen Levels",
      bgColor: "purple.100",
      value: 40
    }
  ];

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      mt="6"
      width="full"
    >
      <MotionText
        fontSize="lg"
        display="flex"
        gapX="3"
        mb="4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        Soil Nutrient Analysis
      </MotionText>
      
      <MotionBox
        display="flex"
        flexWrap="wrap"
        gap="6"
        variants={containerVariants}
      >
        {nutrients.map((nutrient) => (
          <MotionBox key={nutrient.id} variants={itemVariants}>
            <NutrientCard
              icon={nutrient.icon}
              alt={nutrient.alt}
              bgColor={nutrient.bgColor}
              value={nutrient.value}
            />
          </MotionBox>
        ))}
      </MotionBox>
    </MotionBox>
  );
};

export default SoilNutrients;