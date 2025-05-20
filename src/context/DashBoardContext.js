import React, { createContext, useContext, useState, useEffect } from 'react';
import { toaster } from '../components/ui/toaster';

const DashboardContext = createContext();

const defaultCropData = [
  {
    id: 1,
    title: "Wheat",
    subtitle: "Total Production",
    value: "125",
    unit: "Tons",
    progress: 5,
    colorScheme: "green"
  }
];

const defaultWeatherData = {
  temperature: "25",
  condition: "Sunny",
  iconType: "sunny",
  bgColor: "green.100",
  forecast: [
    { day: "Mon", temp: "24", condition: "sunny" },
    { day: "Tue", temp: "22", condition: "cloudy" },
    { day: "Wed", temp: "19", condition: "rainy" },
    { day: "Thu", temp: "20", condition: "cloudy" },
    { day: "Fri", temp: "23", condition: "sunny" }
  ]
};

const defaultNutrientData = [
  {
    id: 1,
    icon: "/assets/potassium.png",
    alt: "Potassium Levels",
    bgColor: "yellow.100",
    value: 40
  },
  {
    id: 2,
    icon: "/assets/calcium.png",
    alt: "Calcium Levels",
    bgColor: "pink.100",
    value: 40
  },
  {
    id: 3,
    icon: "../assets/nitrogen.png",
    alt: "Nitrogen Levels",
    bgColor: "purple.100",
    value: 40
  }
];

const defaultHarvestCostData = [
  { id: 1, category: "Irrigation", amount: 4500, color: "#67e8f9" },
  { id: 2, category: "Fertilizers", amount: 3500, color: "#2dd4bf" },
  { id: 3, category: "Labor", amount: 5500, color: "#c084fc" },
  { id: 4, category: "Equipment", amount: 2800, color: "#5eead4" }
];

const defaultChartData = [
  { windows: 186, mac: 80, linux: 120, month: "January" },
  { windows: 165, mac: 95, linux: 110, month: "February" },
  { windows: 190, mac: 87, linux: 125, month: "March" },
  { windows: 195, mac: 88, linux: 130, month: "May" },
  { windows: 182, mac: 98, linux: 122, month: "June" },
  { windows: 175, mac: 90, linux: 115, month: "August" },
  { windows: 180, mac: 86, linux: 124, month: "October" },
  { windows: 185, mac: 91, linux: 126, month: "November" }
];

const defaultMapCenter = {
  lat: 40.7128,
  lng: -74.0060
};

export function DashboardProvider({ children }) {

  const [cropData, setCropData] = useState([]);
  const [weatherData, setWeatherData] = useState({});
  const [nutrientData, setNutrientData] = useState([]);
  const [harvestCostData, setHarvestCostData] = useState([]);
  const [chartData, setChartData] = useState([]);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [selectedCrop, setSelectedCrop] = useState({});
  const [suggestions, setSuggestions] = useState("");
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setError(null);

      try {
        toaster.create({
          title: "Dashboard loaded",
          description: "All data has been successfully retrieved",
          status: "success",
          duration: 3000,
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
        
        toaster.create({
          title: "Error loading dashboard",
          description: err.message || "Failed to load dashboard data",
          status: "error",
          duration: 5000,
        });
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, []);

  const addCrop = (newCrop) => {
    const updatedCrops = [...cropData, newCrop];
    setCropData(updatedCrops);
    return updatedCrops;
  };

  const updateCrop = (id, updatedCrop) => {
    const updatedCrops = cropData.map(crop => 
      crop.id === id ? { ...crop, ...updatedCrop } : crop
    );
    setCropData(updatedCrops);
    
    if (selectedCrop.id === id) {
      setSelectedCrop({ ...selectedCrop, ...updatedCrop });
    }
    
    return updatedCrops;
  };

  const refreshDashboard = async () => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toaster.create({
        title: "Dashboard refreshed",
        description: "All data has been updated",
        status: "success",
        duration: 3000,
      });
    } catch (err) {
      setError(err.message || "Failed to refresh dashboard data");
      
      toaster.create({
        title: "Error refreshing dashboard",
        description: err.message || "Failed to refresh dashboard data",
        status: "error",
        duration: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const value = {
    // Data
    cropData,
    weatherData,
    nutrientData,
    harvestCostData,
    chartData,
    mapCenter,
    selectedCrop,
    suggestions,
    
    // State
    loading,
    error,
    
    // Actions
    setSelectedCrop,
    addCrop,
    updateCrop,
    refreshDashboard,
    setMapCenter,
    setSuggestions,
  };

  return (
    <DashboardContext.Provider value={value}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom hook to use the dashboard context
export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
}