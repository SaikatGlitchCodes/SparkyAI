import React, { useState } from 'react';
import { Box, Text, Image, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from 'framer-motion';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

// Create motion components
const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionFlex = motion(Flex);

// Default cost items if none provided
const defaultCostItems = [
  { id: 1, category: "Irrigation", amount: 4500, color: "#2B6CB0" }, // blue.700
  { id: 2, category: "Fertilizers", amount: 3500, color: "#2F855A" }, // green.700 
  { id: 3, category: "Labor", amount: 5500, color: "#C05621" }, // orange.700
  { id: 4, category: "Equipment", amount: 2800, color: "#6B46C1" }, // purple.700
];

// Custom Tooltip component for the pie chart
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <Box
        bg="white"
        p="2"
        borderRadius="md"
        boxShadow="md"
        border="1px solid"
        borderColor="gray.200"
      >
        <Text fontWeight="bold">{payload[0].name}</Text>
        <Text>{payload[0].value} <LiaRupeeSignSolid /></Text>
        <Text fontSize="sm" color="gray.500">
          {Math.round(payload[0].percent * 100)}% of total
        </Text>
      </Box>
    );
  }
  return null;
};

const HarvestingCost = ({ costItems = defaultCostItems, bgColor = "green.100" }) => {
  // Calculate total cost
  const totalCost = costItems.reduce((sum, item) => sum + item.amount, 0);
  
  // Format data for the pie chart
  const pieData = costItems.map(item => ({
    name: item.category,
    value: item.amount,
    color: item.color
  }));
  
  // Animation state for pie chart
  const [activeIndex, setActiveIndex] = useState(null);
  
  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };
  
  const onPieLeave = () => {
    setActiveIndex(null);
  };
  
  return (
    <MotionBox 
      mt="4" 
      position="relative" 
      rounded="lg" 
      width="full" 
      bg={bgColor}  
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      padding="6"
      whileHover={{ 
        y: -5,
        boxShadow: "0px 8px 15px rgba(1,0,0,0.1)"
      }}
    >
      
      <MotionFlex 
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
        gap="4"
      >
        {/* Pie Chart Section */}
        <MotionBox 
          height="220px" 
          width={{ base: "100%", md: "60%" }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                innerRadius={40}
                dataKey="value"
                onMouseEnter={onPieEnter}
                onMouseLeave={onPieLeave}
                animationBegin={500}
                animationDuration={1500}
              >
                {pieData.map((entry, index) => {
                  // Use explicit colors array as fallback
                  const COLORS = ['#f472b6', '#c084fc', '#60a5fa', '#2dd4bf', '#E53E3E'];
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fill={entry.color || COLORS[index % COLORS.length]}
                      stroke="#ffffff"
                      strokeWidth={2}
                      style={{
                        filter: activeIndex === index 
                          ? 'drop-shadow(0px 3px 5px rgba(0, 0, 0, 0.3))' 
                          : 'none',
                        transition: 'all 0.3s ease'
                      }}
                    />
                  );
                })}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                formatter={(value, entry, index) => {
                  const color = pieData[index]?.color || 
                               ['#f472b6', '#c084fc', '#60a5fa', '#2dd4bf', '#E53E3E'][index % 4];
                  return <span style={{ color: color, fontWeight: 'medium' }}>{value}</span>;
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </MotionBox>
        
        {/* Total Cost Section */}
        <MotionBox
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
          width={{ base: "100%", md: "35%" }}
          textAlign={{ base: "center", md: "right" }}
        >
          <MotionText 
            fontSize="sm" 
            mb="2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            Total Harvesting Cost
          </MotionText>
          
          <MotionText 
            fontSize={{ base: "3xl", md: "4xl" }} 
            fontWeight="bold"
            display="flex" 
            alignItems="center"
            justifyContent={{ base: "center", md: "flex-end" }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              delay: 0.9, 
              duration: 0.5, 
              type: "spring", 
              stiffness: 100 
            }}
          >
            <LiaRupeeSignSolid style={{ marginRight: '4px' }} />
            {totalCost.toLocaleString()}
          </MotionText>
          
          <MotionBox
            mt="4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.4 }}
          >
            <AnimatePresence>
              {costItems.map((item, index) => (
                <MotionFlex
                  key={item.id}
                  align="center"
                  justify={{ base: "center", md: "flex-end" }}
                  mb="1"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 + (index * 0.1) }}
                  whileHover={{ x: -5 }}
                >
                  <Box 
                    w="3" 
                    h="3" 
                    borderRadius="full" 
                    bg={item.color || "gray.500"} 
                    mr="2" 
                  />
                  <Text fontSize="sm">{item.category}: {item.amount.toLocaleString()}</Text>
                </MotionFlex>
              ))}
            </AnimatePresence>
          </MotionBox>
        </MotionBox>
      </MotionFlex>
    </MotionBox>
  );
};

export default HarvestingCost;