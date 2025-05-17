import React, { useState } from 'react';
import { AbsoluteCenter, Avatar, Box, ProgressCircle, Text, Flex, ActionBar, Portal, Button } from "@chakra-ui/react";
import './App.css';
import { ColorModeButton } from './components/ui/color-mode';
import { LuShare } from 'react-icons/lu';
import GoogleMapCustom from './components/GoogleMap';

const AvatarProfile = () => (
  <Flex justify="flex-end" align="center">
    <Avatar.Root size="md">
      <Avatar.Fallback name="Segun Adebayo" />
      <Avatar.Image src="https://bit.ly/sage-adebayo" />
    </Avatar.Root>
  </Flex>
);

const SummaryCard = ({ title, subtitle, value, unit, progress, colorScheme }) => {
  const bgColor = `${colorScheme}.100`;
  const strokeColor = `${colorScheme}.400`;
  
  return (
    <Box 
      width="96" 
      padding="12px" 
      rounded="md" 
      display="flex" 
      justifyContent="space-between" 
      bg={bgColor}
    >
      <Box paddingY="4px" display="flex" flexDirection="column" gapY="4px">
        <Text color="black">{title}</Text>
        <Text fontSize="xx-small" color="gray.600">{subtitle}</Text>
        <Text fontWeight="bolder" color="black" fontSize="4xl">{value} {unit}</Text>
      </Box>
      <Box display="flex" alignItems="center">
        <ProgressCircle.Root size="xl" value={progress} colorPalette={colorScheme}>
          <ProgressCircle.Circle css={{ "--thickness": "9px" }}>
            <ProgressCircle.Track />
            <ProgressCircle.Range strokeLinecap="round" stroke={strokeColor} />
          </ProgressCircle.Circle>
          <AbsoluteCenter>
            <ProgressCircle.ValueText color="black" />
          </AbsoluteCenter>
        </ProgressCircle.Root>
      </Box>
    </Box>
  );
};

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
      <Flex justify="right" align="center" mb="3" gapX="9">
        <ColorModeButton />
        <AvatarProfile />
      </Flex>
      
      <Box >
        <Text mb="4" fontSize="xl" color="gray.500">Summary</Text>
        <Flex gap="5" flexWrap="wrap">
          {cards.map(card => (
            <SummaryCard
              key={card.id}
              title={card.title}
              subtitle={card.subtitle}
              value={card.value}
              unit={card.unit}
              progress={card.progress}
              colorScheme={card.colorScheme}
            />
          ))}
          
          <Box 
            width="96" 
            padding="12px" 
            rounded="md" 
            display="flex" 
            justifyContent="center"
            alignItems="center"
            borderStyle="dashed" 
            borderColor="gray.200" 
            borderWidth="2px"
            cursor="pointer"
            onClick={() => setAddNewCrop(!addNewCrop)}
            _hover={{ borderColor: "gray.400" }}
            transition="all 0.2s"
          >
            <Text color="gray.500" fontSize="lg" >Add New Card</Text>
          </Box>
        </Flex>
        <Box mt="6">
          <Text fontSize="xl" mb="4" color="gray.500">Manage your farm</Text>
          <GoogleMapCustom />
        </Box>
        <Box mt="6">
          <Text fontSize="xl" mb="4" color="gray.500">Predictive Analysis</Text>

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
            </ActionBar.Content>
          </ActionBar.Positioner>
        </Portal>
      </ActionBar.Root>
    </Box>
  );
}

export default App;