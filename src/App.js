import React, { useState } from 'react';
import { Avatar, Box, Text, Flex, ActionBar, Portal, Button, Image } from "@chakra-ui/react";
import './App.css';
import { ColorModeButton } from './components/ui/color-mode';
import SummaryCard from './components/SummaryCard';
import { LuShare } from 'react-icons/lu';
import GoogleMapCustom from './components/GoogleMap';
import { GrStepsOption } from "react-icons/gr";
import { PiConfettiLight, PiPlantThin } from "react-icons/pi";
import { TiWeatherStormy } from "react-icons/ti";
import { GiFarmTractor, GiUbisoftSun } from "react-icons/gi";
import { IoAnalytics } from "react-icons/io5";
import ChartGraph from './components/ChartGraph';
import PotassiumIcon from './assests/potassium.png';
import NitrogenIcon from './assests/nitrogen.png';
import CalciumIcon from './assests/calcium.png';
import NutrientCard from './components/NutrientCard';

const AvatarProfile = () => (
  <Flex justify="flex-end" align="center">
    <Avatar.Root size="md">
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  </Flex>
);

function App() {
  const [addNewCrop, setAddNewCrop] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      title: "Wheat",
      subtitle: "Total Production",
      value: "125",
      unit: "Tons",
      progress: 5,
      colorScheme: "cyan"
    }
  ]);
  const [selectedCrop, setSelectedCrop] = useState(cards[0]);

  const addCard = () => {
    const colorSchemes = ["red", "orange", "yellow", "green", "teal", "blue", "cyan", "purple", "pink"];
    const randomColor = colorSchemes[Math.floor(Math.random() * colorSchemes.length)];

    const newCard = {
      id: Date.now(),
      title: "New Item",
      subtitle: "Add description",
      value: "0",
      unit: "Units",
      progress: 0,
      colorScheme: randomColor
    };
    setCards([...cards, newCard]);
  };

  return (
    <Box padding="40px" className="container">
      <Flex justify="space-between" align="center" mb="3" gapX="9">
        <GrStepsOption />
        <Box display="flex" gapX="9">
          <ColorModeButton />
          <AvatarProfile />
        </Box>
      </Flex>
      <Box display="flex" gapX="8" gapY="5" flexWrap="wrap">
        <Box width="60%" pr="4">
          <Text mb="4" fontSize="xl" display="flex" gapX="2" >Summary <PiConfettiLight size="1.3em" /></Text>
          <Flex gap="5" flexWrap="wrap">
            {cards.map(card => (
              <Box onClick={() => setSelectedCrop(card)} key={card.id}>
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

            <Box
              width="96"
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
              transition="all 0.2s"
            >
              <Text color="gray.500" fontSize="lg" display="flex" alignItems="center" gapX="3">Add New Crop <PiPlantThin /></Text>
            </Box>
          </Flex>
          <Box mt="6">
            <Text fontSize="xl" mb="4" display="flex" gapX="3">Manage your farm <GiFarmTractor size="1.5em" /></Text>
            <GoogleMapCustom />
          </Box>
          <Box mt="6">
            <Text fontSize="xl" mb="4" display="flex" gapX="3">Predictive Analysis <IoAnalytics size="1.5em" /></Text>
            <ChartGraph />
          </Box>
        </Box>
        <Box width="35%" pl="4">
          <Text fontSize="lg" display="flex" gapX="3">Weather Analytics <TiWeatherStormy size="1.5em" /> </Text>
          <Box position="relative" display="flex" alignItems="center" rounded="lg" mt="5" bg="green.200" padding="5" height="48" width="full" gapX="8">
            <GiUbisoftSun size="6em" />
            <Box>
              <Text fontSize="3xl">  Today </Text>
              <Text fontSize="2xl" fontWeight="bold" color="gray.700">  25°C </Text>
              <Text fontSize="lg" color="gray.700">  Sunny </Text>
            </Box>
            <Image
              src="https://cdn-icons-png.flaticon.com/512/7986/7986334.png"
              alt="Weather Analytics"
              width="150px"
              height="150px"
              borderRadius="lg"
              fallbackSrc="https://via.placeholder.com/400"
              position="absolute"
              top="24"
              right="-10"
            />
          </Box>
          <Box mt="6" display="flex" flexWrap="wrap" gap="6">
            <NutrientCard 
              icon={PotassiumIcon} 
              alt="Potassium Levels" 
              bgColor="yellow.100" 
              value={40} 
            />
            <NutrientCard 
              icon={CalciumIcon} 
              alt="Calcium Levels" 
              bgColor="pink.100" 
              value={40} 
            />
            <NutrientCard 
              icon={NitrogenIcon} 
              alt="Nitrogen Levels" 
              bgColor="purple.100" 
              value={40} 
            />
          </Box>
        </Box>
      </Box>
      <ActionBar.Root open={addNewCrop}>
        <Portal>
          <ActionBar.Positioner>
            <ActionBar.Content>
              <ActionBar.SelectionTrigger onClick={addCard}>
                Add New Crop
              </ActionBar.SelectionTrigger>
              <ActionBar.Separator />
              <Button variant="outline" size="sm">
                <LuShare />
                Download Report
              </Button>
              <Button onClick={()=> setAddNewCrop(false) } size="sm">
                X
              </Button>
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Box>
  );
}

export default App;