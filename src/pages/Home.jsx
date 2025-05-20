import React, { useState } from 'react';
import { Box, Text, CloseButton } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import '../App.css';

import Header from '../components/Header';
import SummarySection from '../components/SummarySection';
import FarmManagement from '../components/FarmManagement';
import PredictiveAnalysis from '../components/PredictiveAnalysis';
import Sidebar from '../components/Sidebar';
import ActionBarComponent from '../components/ActionBarComponent';
import { GiFirePunch } from "react-icons/gi";
import { useDashboard } from '../context/DashBoardContext';

const MotionBox = motion(Box);

function Home() {
  const [addNewCrop, setAddNewCrop] = useState(false);
  const [showTip, setShowTip] = useState(true);
  const { 
    cropData, 
    selectedCrop, 
    setSelectedCrop, 
    loading, 
    addCrop 
  } = useDashboard();
  
  if (loading) {
    return <div>Loading dashboard data...</div>;
  }

  const addCard = () => {
    const colorSchemes = ["red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"];
    const randomColor = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

    addCrop({
      id: Date.now(),
      title: "New Item",
      subtitle: "Add description",
      value: "0",
      unit: "Units",
      progress: 0,
      colorScheme: randomColor
    });
  };

  return (
    <Box padding={{md:"40px", base:"15px"}} className="container">
      <Header />
      
      <Box 
        display="flex" 
        flexDirection={{ base: "column", md: "row" }}
        gap="5"
        flexWrap="wrap"
      >
        <Box 
          width={{ base: "100%", md: "60%" }} 
          pr={{ base: "0" }}
          mb={{ base: "6", md: "0" }}
        >
          <SummarySection 
            cards={cropData}
            selectedCrop={selectedCrop}
            setSelectedCrop={setSelectedCrop}
            setAddNewCrop={setAddNewCrop}
            addNewCrop={addNewCrop}
          />
          
          {showTip && (
            <MotionBox 
              mt="6" 
              position="relative" 
              display="flex" 
              alignItems="center" 
              gap="4" 
              borderRadius="lg" 
              bg="cyan.100" 
              p="4" 
              width={{ base: "100%", md: "80%" }}
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <GiFirePunch size="3em"/>
              <Text fontWeight="medium" fontSize={{ base: "md", md: "xl" }}>
                You can increase profits by rotating crops, land looks good for it.
              </Text>
              <CloseButton 
                position="absolute" 
                right="-4" 
                top="-4"
                size="sm"
                onClick={() => setShowTip(false)}
              />
            </MotionBox>
          )}
          
          <FarmManagement />
          
          <PredictiveAnalysis />
        </Box>
        
        <Box 
          width={{ base: "100%", md: "35%" }} 
          pl={{ base: "0", md: "4" }}
        >
          <Sidebar />
        </Box>
      </Box>
      
      <ActionBarComponent 
        isOpen={addNewCrop}
        onClose={() => setAddNewCrop(false)}
        onAddCard={addCard}
      />
    </Box>
  );
}

export default Home;