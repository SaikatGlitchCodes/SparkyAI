import React, { useRef } from "react";
import { APIProvider, Map } from '@vis.gl/react-google-maps';
import { Box } from "@chakra-ui/react";

const AnyReactComponent = ({ text }) => (
    <Box
        bg="red.500"
        color="white"
        p={2}
        borderRadius="md"
        boxShadow="md"
    >
        {text}
    </Box>
);

export default function GoogleMapCustom() {
    const defaultProps = {
        center: {
            lat: 10.99835602,
            lng: 77.01502627
        },
        zoom: 11
    };

    const mapContainerRef = useRef(null);
    console.log(process.env.GOOGLE_MAPS_API_KEY)
    return (
        <Box
            ref={mapContainerRef}
            height="350px"
            width="100%"
            borderRadius="xl"
            overflow="hidden"
            bg="gray.100"
        >
        </Box>
    );
}