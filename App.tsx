
import React, { useState } from 'react';
import HomeScreen from './HomeScreen';
import LocationSelectionPage from './LocationSelectionPage';
import NavigationPage from './NavigationPage.tsx';
import ExplorePage from './ExplorePage';
import ExploreCategoryLocationsPage from './ExploreCategoryLocationsPage'; 
import LocationDetailsPage from './LocationDetailsPage'; 
import FooterNav from './FooterNav'; 
import RoomSelectionPage from './RoomSelectionPage';
import { LocationCategory } from './locationData';
import { buildingRoomData } from './roomData';

type Page = 
  | 'welcome' 
  | 'home' 
  | 'currentLocationSelection' 
  | 'destinationSelection' 
  | 'specificRoomSelection'
  | 'navigation'
  | 'explore'
  | 'exploreCategoryLocations' 
  | 'locationDetails'; 

const destinationsRequiringSpecificRoom = [
  "Wet Building (WET)", "Engineering Building (E)", "New Ted (NT)",
  "Administration Block", "Butterfly", "ODL", "Main Building",
  "Ndirande A Hostel", "Ndirande B Hostel", "Kapeni A Hostel",
  "Kapeni B Hostel", "Nyika A Hostel", "Nyika B Hostel", "Mpingwi Hostel",
  "Main Lecture Theatre (MLT)", "Electrical Engineering"
];

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [currentLocation, setCurrentLocation] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [specificRoom, setSpecificRoom] = useState<string>('');
  
  const [selectedExploreCategory, setSelectedExploreCategory] = useState<LocationCategory | null>(null);
  const [selectedLocationForDetails, setSelectedLocationForDetails] = useState<string | null>(null);


  const handleGetStartedClick = () => {
    setCurrentPage('home');
  };

  const navigateToCurrentLocationSelection = () => setCurrentPage('currentLocationSelection');
  const handleCurrentLocationConfirmed = (location: string) => {
    setCurrentLocation(location);
    setCurrentPage('home');
  };
  const handleCancelCurrentLocationSelection = () => setCurrentPage('home');

  const navigateToDestinationSelection = () => setCurrentPage('destinationSelection');
  
  const handleDestinationConfirmed = (location: string) => {
    let parentBuilding = '';
    for (const [building, rooms] of Object.entries(buildingRoomData)) {
      if (rooms.includes(location)) {
        parentBuilding = building;
        break;
      }
    }

    if (parentBuilding) {
      setDestination(parentBuilding);
      setSpecificRoom(location);
    } else {
      setDestination(location);
      if (destination !== location) { 
        setSpecificRoom(''); 
      }
      if (!destinationsRequiringSpecificRoom.includes(location)) {
        setSpecificRoom('');
      }
    }
    setCurrentPage('home');
  };

  const handleCancelDestinationSelection = () => {
    setCurrentPage('home');
  };

  const handleSpecificRoomChange = (room: string) => {
    setSpecificRoom(room);
  };

  const navigateToSpecificRoomSelection = () => {
    if (destination && buildingRoomData[destination]) {
      setCurrentPage('specificRoomSelection');
    }
  };

  const handleSpecificRoomConfirmed = (room: string) => {
    setSpecificRoom(room);
    setCurrentPage('home');
  };

  const handleCancelSpecificRoomSelection = () => {
    setCurrentPage('home');
  };
  
  const handleClearSpecificRoomSelection = () => {
    setSpecificRoom('');
    setCurrentPage('home');
  };

  const handleNavigateToNavigationPage = () => setCurrentPage('navigation');
  const handleBackToHomeFromNavigation = () => setCurrentPage('home');

  const navigateToExplorePage = () => {
    setSelectedExploreCategory(null);
    setSelectedLocationForDetails(null);
    setCurrentPage('explore');
  };

  const handleCategoryExplore = (category: LocationCategory) => {
    setSelectedExploreCategory(category);
    setCurrentPage('exploreCategoryLocations');
  };

  const handleExploreLocation = (locationName: string) => {
    setSelectedLocationForDetails(locationName);
    setCurrentPage('locationDetails');
  };

  const handleBackToExploreFromLocationsList = () => { 
    setSelectedExploreCategory(null);
    setCurrentPage('explore');
  };

  const handleBackToLocationsListFromDetails = () => { 
    setSelectedLocationForDetails(null);
    setCurrentPage('exploreCategoryLocations');
  };
  
  const handleBackToHomeFromExplore = () => { 
    setSelectedExploreCategory(null);
    setSelectedLocationForDetails(null);
    setCurrentPage('home');
  };

  const handleNavigateToRoomDirections = (destinationName: string, roomName: string) => {
    setDestination(destinationName);
    setSpecificRoom(roomName);
    setCurrentLocation(''); 
    setCurrentPage('currentLocationSelection');
  };


  if (currentPage === 'welcome') {
    return (
      <div className="flex flex-col h-screen bg-custom-indigo">
        <div className="text-white flex-[2] flex flex-col justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 400 400"
            className="w-36 h-auto"
            aria-label="mubasss Logo"
          >
            <path d="M200 50 C250 50, 290 90, 290 140 C290 190, 200 320, 200 320 C200 320, 110 190, 110 140 C110 90, 150 50, 200 50 Z" 
                  fill="#ffffff" 
                  stroke="none"/>
            
            <circle cx="200" cy="140" r="55" fill="#3A3F7A"/>
            
            <g transform="translate(200, 140)">
              <rect x="-35" y="-15" width="20" height="30" fill="#ffffff"/>
              <rect x="-32" y="-10" width="4" height="6" fill="#3A3F7A"/>
              <rect x="-25" y="-10" width="4" height="6" fill="#3A3F7A"/>
              <rect x="-32" y="0" width="4" height="6" fill="#3A3F7A"/>
              <rect x="-25" y="0" width="4" height="6" fill="#3A3F7A"/>
              
              <rect x="15" y="-15" width="20" height="30" fill="#ffffff"/>
              <rect x="18" y="-10" width="4" height="6" fill="#3A3F7A"/>
              <rect x="25" y="-10" width="4" height="6" fill="#3A3F7A"/>
              <rect x="18" y="0" width="4" height="6" fill="#3A3F7A"/>
              <rect x="25" y="0" width="4" height="6" fill="#3A3F7A"/>
              
              <rect x="-15" y="-25" width="30" height="40" fill="#ffffff"/>
              
              <polygon points="-18,-25 0,-35 18,-25" fill="#ffffff"/>
              
              <rect x="-10" y="-20" width="4" height="6" fill="#3A3F7A"/>
              <rect x="-3" y="-20" width="4" height="6" fill="#3A3F7A"/>
              <rect x="4" y="-20" width="4" height="6" fill="#3A3F7A"/>
              
              <rect x="-6" y="5" width="12" height="10" fill="#3A3F7A"/>
            </g>
          </svg>
        </div>
        <div className="flex-[1] flex justify-center items-end pb-50px bg-white rounded-tl-40px rounded-tr-40px">
          <button
            onClick={handleGetStartedClick}
            className="bg-white text-custom-indigo border-3 border-custom-indigo rounded-40px py-3 px-30px text-lg font-bold cursor-pointer transition-colors duration-300 ease-in-out hover:bg-custom-indigo hover:text-white focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-50"
            aria-label="Get started with mubasss"
          >
            Get started
          </button>
        </div>
      </div>
    );
  }

  const activeFooterTab = (currentPage === 'home') ? 'home' : 
                          (currentPage === 'explore' || currentPage === 'exploreCategoryLocations' || currentPage === 'locationDetails') ? 'explore' : undefined;

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <div className="flex-grow overflow-y-auto">
        {currentPage === 'home' && (
          <HomeScreen
            currentLocation={currentLocation}
            destination={destination}
            specificRoom={specificRoom}
            onNavigateToCurrentLocationSelection={navigateToCurrentLocationSelection}
            onNavigateToDestinationSelection={navigateToDestinationSelection}
            onSpecificRoomChange={handleSpecificRoomChange}
            onNavigateToSpecificRoomSelection={navigateToSpecificRoomSelection}
            onStartNavigation={handleNavigateToNavigationPage}
            destinationsWithPredefinedRooms={buildingRoomData}
            destinationsRequiringSpecificRoomEntry={destinationsRequiringSpecificRoom}
          />
        )}
        {currentPage === 'currentLocationSelection' && (
          <LocationSelectionPage
            pageTitle="Select Start Point" 
            onLocationConfirm={handleCurrentLocationConfirmed}
            onCancel={handleCancelCurrentLocationSelection}
            selectionContext="current"
          />
        )}
        {currentPage === 'destinationSelection' && (
          <LocationSelectionPage
            pageTitle="Select Destination" 
            onLocationConfirm={handleDestinationConfirmed}
            onCancel={handleCancelDestinationSelection}
            selectionContext="destination"
          />
        )}
        {currentPage === 'specificRoomSelection' && destination && buildingRoomData[destination] && (
          <RoomSelectionPage
            buildingName={destination}
            allRooms={buildingRoomData[destination]}
            currentSelectedRoom={specificRoom}
            onConfirm={handleSpecificRoomConfirmed}
            onCancel={handleCancelSpecificRoomSelection}
            onClearSelection={handleClearSpecificRoomSelection}
          />
        )}
        {currentPage === 'navigation' && (
          <NavigationPage
            currentLocation={currentLocation}
            destination={destination}
            specificRoom={specificRoom}
            onBack={handleBackToHomeFromNavigation}
          />
        )}
        {currentPage === 'explore' && (
          <ExplorePage 
            onSelectCategory={handleCategoryExplore}
            onBack={handleBackToHomeFromExplore} 
          />
        )}
        {currentPage === 'exploreCategoryLocations' && selectedExploreCategory && (
          <ExploreCategoryLocationsPage
            categoryName={selectedExploreCategory}
            onExploreLocation={handleExploreLocation}
            onBack={handleBackToExploreFromLocationsList}
          />
        )}
        {currentPage === 'locationDetails' && selectedLocationForDetails && (
          <LocationDetailsPage
            locationName={selectedLocationForDetails}
            onBack={handleBackToLocationsListFromDetails}
            onNavigateToRoomDirections={handleNavigateToRoomDirections} 
          />
        )}
      </div>

      {activeFooterTab && (
        <FooterNav
          activeTab={activeFooterTab}
          onNavigateToHome={() => setCurrentPage('home')}
          onNavigateToExplore={navigateToExplorePage}
        />
      )}
    </div>
  );
};

export default App;
