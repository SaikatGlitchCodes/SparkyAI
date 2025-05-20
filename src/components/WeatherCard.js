import React from 'react';
import { Box, Text, Image, Flex, Separator } from "@chakra-ui/react";
import { motion } from 'framer-motion';
import { GiUbisoftSun } from "react-icons/gi";
import { WiCloudy, WiRain, WiSnow, WiThunderstorm } from "react-icons/wi";
import { useDashboard } from '../context/DashBoardContext';

// Create motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionImage = motion(Image);
const MotionFlex = motion(Flex);
const MotionDivider = motion(Separator);

const WeatherCard = () => {
  // Get weather data from context
  const { weatherData } = useDashboard();
  if(Object.keys(weatherData).length === 0){
    return <Text>Not Present</Text>;
  }
  const { 
    temperature, 
    condition, 
    iconType, 
    bgColor, 
    forecast 
  } = weatherData;

  // Select weather icon based on condition
  const getWeatherIcon = (type = iconType) => {
    switch(type?.toLowerCase()) {
      case 'cloudy':
        return <WiCloudy size="6em" />;
      case 'rainy':
        return <WiRain size="6em" />;
      case 'snowy':
        return <WiSnow size="6em" />;
      case 'stormy':
        return <WiThunderstorm size="6em" />;
      case 'sunny':
      default:
        return <GiUbisoftSun size="6em" />;
    }
  };

  // Get small weather icon
  const getSmallWeatherIcon = (type) => {
    switch(type?.toLowerCase()) {
      case 'cloudy':
        return <WiCloudy size="1.5em" />;
      case 'rainy':
        return <WiRain size="1.5em" />;
      case 'snowy':
        return <WiSnow size="1.5em" />;
      case 'stormy':
        return <WiThunderstorm size="1.5em" />;
      case 'sunny':
      default:
        return <GiUbisoftSun size="1.5em" />;
    }
  };

  // Get image URL based on weather condition
  const getWeatherImage = () => {
    switch(iconType?.toLowerCase()) {
      case 'cloudy':
        return "https://cdn-icons-png.flaticon.com/512/1146/1146869.png";
      case 'rainy':
        return "https://cdn-icons-png.flaticon.com/512/1146/1146858.png";
      case 'snowy':
        return "https://cdn-icons-png.flaticon.com/512/1146/1146911.png";
      case 'stormy':
        return "https://cdn-icons-png.flaticon.com/512/1146/1146860.png";
      case 'sunny':
      default:
        return "https://cdn-icons-png.flaticon.com/512/7986/7986334.png";
    }
  };

  return (
    <MotionBox 
      position="relative" 
      display="flex" 
      flexDirection="column"
      rounded="lg" 
      mt="5" 
      bg={bgColor} 
      padding="5" 
      width="full" 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ y: -5, boxShadow: "0px 5px 15px rgba(0,0,0,0.1)" }}
    >
      {/* Today's weather */}
      <MotionBox
        display="flex"
        alignItems="center"
        height="40"
        gapX="8"
      >
        <MotionBox
          initial={{ opacity: 0, rotate: -10 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.5, delay: 0.4, type: "spring" }}
          whileHover={{ rotate: 10, scale: 1.1, transition: { duration: 0.3 } }}
        >
          {getWeatherIcon()}
        </MotionBox>
        
        <MotionBox
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.6, type: "spring", stiffness: 100 }}
        >
          <MotionText 
            fontSize="3xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Today
          </MotionText>
          <MotionText 
            fontSize="2xl" 
            fontWeight="bold" 
            color="gray.700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {temperature}°C
          </MotionText>
          <MotionText 
            fontSize="lg" 
            color="gray.700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9 }}
          >
            {condition}
          </MotionText>
        </MotionBox>
        
        <MotionImage
          src={getWeatherImage()}
          alt="Weather Analytics"
          width="150px"
          height="150px"
          display={{ base: "none", md: "block" }}
          borderRadius="lg"
          fallbackSrc="https://via.placeholder.com/400"
          position="absolute"
          top="24"
          right="-10"
          initial={{ opacity: 0, scale: 0, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.0, type: "spring", stiffness: 80 }}
          whileHover={{ y: -10, rotate: 5, scale: 1.05, transition: { duration: 0.3 } }}
        />
      </MotionBox>
      
      {/* Divider */}
      <MotionDivider 
        my="3"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      />
      
      {/* 5-day forecast */}
      <MotionText
        fontSize="md"
        fontWeight="medium"
        mb="2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3 }}
      >
        5-Day Forecast
      </MotionText>
      
      <MotionFlex
        justify="space-between"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.4, duration: 0.5 }}
      >
        {forecast.map((day, index) => (
          <MotionBox
            key={day.day}
            textAlign="center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 + (index * 0.1), duration: 0.3 }}
            whileHover={{ y: -3, scale: 1.05 }}
          >
            <MotionText fontSize="sm" fontWeight="bold">{day.day}</MotionText>
            <MotionBox
              display="flex"
              justifyContent="center"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5 + (index * 0.1) }}
              whileHover={{ rotate: 5 }}
            >
              {getSmallWeatherIcon(day.condition)}
            </MotionBox>
            <MotionText fontSize="sm">{day.temp}°</MotionText>
          </MotionBox>
        ))}
      </MotionFlex>
    </MotionBox>
  );
};

export default WeatherCard;