import React from 'react';
import { Box, Text, ProgressCircle, AbsoluteCenter } from "@chakra-ui/react";

const SummaryCard = ({ title, subtitle, value, unit, progress, colorScheme }) => {
  const bgColor = `${colorScheme}.100`;
  const strokeColor = `${colorScheme}.400`;

  return (
    <Box
      width={{ base: "100%", md: "96" }}
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

export default SummaryCard;