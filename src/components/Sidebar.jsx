import React from 'react';
import { Box, Text } from "@chakra-ui/react";
import { TiWeatherStormy } from "react-icons/ti";
import { LiaRupeeSignSolid } from "react-icons/lia";
import WeatherCard from './WeatherCard';
import SoilNutrients from './SoilNutrients';
import HarvestingCost from './HarvestingCost';

const Sidebar = () => {
  return (
    <Box width="100%">
      <Text fontSize="lg" display="flex" gapX="3">
        Weather Analytics <TiWeatherStormy size="1.5em" />
      </Text>
      <WeatherCard />
      
      <SoilNutrients />
      
      <Text mt="6" fontSize="lg" display="flex" gapX="3">
        Harvesting Cost <LiaRupeeSignSolid size="1.5em" />
      </Text>
      <HarvestingCost 
        costItems={[
          { id: 1, category: "Irrigation", amount: 4500 },
          { id: 2, category: "Fertilizers", amount: 3500 },
          { id: 3, category: "Labor", amount: 5500 },
        ]}
        bgColor="white"
      />
    </Box>
  );
};

export default Sidebar;