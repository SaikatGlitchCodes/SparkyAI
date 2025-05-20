import React, { createContext, useContext, useState, useEffect } from 'react';
import { toaster } from '../components/ui/toaster';

// Create the context
const DashboardContext = createContext();

// Sample default data (fallback data when loading)
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
    icon: "/assets/nitrogen.png",
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
  // State for different data categories
  const [cropData, setCropData] = useState(defaultCropData);
  const [weatherData, setWeatherData] = useState(defaultWeatherData);
  const [nutrientData, setNutrientData] = useState(defaultNutrientData);
  const [harvestCostData, setHarvestCostData] = useState(defaultHarvestCostData);
  const [chartData, setChartData] = useState(defaultChartData);
  const [mapCenter, setMapCenter] = useState(defaultMapCenter);
  const [selectedCrop, setSelectedCrop] = useState(defaultCropData[0]);
  
  // UI state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load all dashboard data on component mount
  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setError(null);

      try {
        // In a real app, you would fetch data from Supabase here
        // For example:
        // const { data: cropsData, error: cropsError } = await supabase
        //   .from('crops')
        //   .select('*');
        
        // if (cropsError) throw cropsError;
        // setCropData(cropsData);
        
        // For demonstration, we'll simulate loading with a timeout
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Set with real data from your API calls
        // For now we'll just use the defaults
        setCropData(defaultCropData);
        setWeatherData(defaultWeatherData);
        setNutrientData(defaultNutrientData);
        setHarvestCostData(defaultHarvestCostData);
        setChartData(defaultChartData);
        setMapCenter(defaultMapCenter);
        setSelectedCrop(defaultCropData[0]);

        // Show success message
        toaster.create({
          title: "Dashboard loaded",
          description: "All data has been successfully retrieved",
          status: "success",
          duration: 3000,
        });
      } catch (err) {
        console.error("Error loading dashboard data:", err);
        setError(err.message || "Failed to load dashboard data");
        
        // Show error message
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

  // Function to add a new crop
  const addCrop = (newCrop) => {
    const updatedCrops = [...cropData, newCrop];
    setCropData(updatedCrops);
    return updatedCrops;
  };

  // Function to update an existing crop
  const updateCrop = (id, updatedCrop) => {
    const updatedCrops = cropData.map(crop => 
      crop.id === id ? { ...crop, ...updatedCrop } : crop
    );
    setCropData(updatedCrops);
    
    // If the selected crop was updated, update it too
    if (selectedCrop.id === id) {
      setSelectedCrop({ ...selectedCrop, ...updatedCrop });
    }
    
    return updatedCrops;
  };

  // Function to refresh all dashboard data
  const refreshDashboard = async () => {
    setLoading(true);
    try {
      // In a real app, you would fetch fresh data here
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success message
      toaster.create({
        title: "Dashboard refreshed",
        description: "All data has been updated",
        status: "success",
        duration: 3000,
      });
    } catch (err) {
      setError(err.message || "Failed to refresh dashboard data");
      
      // Show error message
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

  // Value to be provided by the context
  const value = {
    // Data
    cropData,
    weatherData,
    nutrientData,
    harvestCostData,
    chartData,
    mapCenter,
    selectedCrop,
    
    // State
    loading,
    error,
    
    // Actions
    setSelectedCrop,
    addCrop,
    updateCrop,
    refreshDashboard,
    setMapCenter
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