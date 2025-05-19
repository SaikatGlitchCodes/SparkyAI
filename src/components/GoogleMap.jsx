    import React from 'react';
    import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { googleMapApiKey } from '../utils/supabase';
    
    const MapComponent = () => {
      const mapStyles = {
        height: '400px',
        width: '100%',
        borderRadius: '8px',
      };
    
      const defaultCenter = {
        lat: 40.7128,
        lng: -74.0060
      };
    
      return (
        <LoadScript googleMapsApiKey={googleMapApiKey}>
          <GoogleMap
            mapContainerStyle={mapStyles}
            zoom={18}
            center={defaultCenter}
          >
            <Marker position={defaultCenter} />
          </GoogleMap>
        </LoadScript>
      );
    };
    
    export default MapComponent;