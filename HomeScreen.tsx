
import React from 'react';
import { BuildingRoomData } from './roomData'; // Import type
import { locations } from './locationData'; // Import locations to check for hostel category

interface HomeScreenProps {
  currentLocation: string;
  destination: string;
  specificRoom: string;
  onNavigateToCurrentLocationSelection: () => void;
  onNavigateToDestinationSelection: () => void;
  onSpecificRoomChange: (room: string) => void; // For text input
  onNavigateToSpecificRoomSelection: () => void; // For navigating to RoomSelectionPage
  onStartNavigation: () => void;
  destinationsWithPredefinedRooms: BuildingRoomData; // Rooms data { "Building Name": ["Room1", "Room2"] }
  destinationsRequiringSpecificRoomEntry: string[]; // List of destinations that can have specific room
}

const HomeScreen: React.FC<HomeScreenProps> = ({
  currentLocation,
  destination,
  specificRoom,
  onNavigateToCurrentLocationSelection,
  onNavigateToDestinationSelection,
  onSpecificRoomChange,
  onNavigateToSpecificRoomSelection,
  onStartNavigation,
  destinationsWithPredefinedRooms,
  destinationsRequiringSpecificRoomEntry,
}) => {

  const handleStartNavigation = () => {
    if (!currentLocation || !destination) {
      alert('Please select both current location and destination.');
      return;
    }
    if (currentLocation === destination && !specificRoom.trim()) {
      alert('Current location and destination cannot be the same unless a specific room/office is provided for the destination.');
      return;
    }
    onStartNavigation();
  };

  const isNavigationDisabled = !currentLocation || !destination || (currentLocation === destination && !specificRoom.trim());
  
  const showSpecificRoomArea = destination && destinationsRequiringSpecificRoomEntry.includes(destination);
  const useRoomSelectionUI = showSpecificRoomArea && destinationsWithPredefinedRooms[destination];

  // Determine specific label and placeholder based on destination
  let specificRoomLabel = "Room Number or Office Name (Optional)";
  let specificRoomPlaceholderText = "Enter room/office (e.g., Room 101)";
  let specificRoomSelectionPlaceholderText = "Select room/office (optional)";
  let specificRoomAriaLabelSuffix = "room number or office name";
  let specificRoomSelectionAriaLabelSuffix = "room/office";

  if (destination) {
    const isHostel = locations.Hostel.some(hostel => hostel.name === destination);

    if (destination === "Administration Block") {
      specificRoomLabel = "Office Name (Optional)";
      specificRoomPlaceholderText = "Enter office name (e.g., Registrar Office)";
      specificRoomSelectionPlaceholderText = "Select office (optional)";
      specificRoomAriaLabelSuffix = "office name";
      specificRoomSelectionAriaLabelSuffix = "office";
    } else if (
        isHostel || 
        destination === "Main Building" || 
        destination === "Engineering Building (E)" ||
        destination === "New Ted (NT)" ||
        destination === "Butterfly" // Added Butterfly here
      ) {
      specificRoomLabel = "Room Number (Optional)";
      specificRoomPlaceholderText = "Enter room number (e.g., Room 101)";
      specificRoomSelectionPlaceholderText = "Select room (optional)";
      specificRoomAriaLabelSuffix = "room number";
      specificRoomSelectionAriaLabelSuffix = "room";
    }
  }


  return (
    <div className="flex flex-col h-screen bg-white font-sans">
      <header className="py-6 px-4">
        <h1 className="text-3xl font-bold text-center text-custom-indigo">
          SmartStep Navigator
        </h1>
      </header>

      <main className="flex-grow bg-slate-50 p-6 pt-8 rounded-t-2xl shadow-sm mx-1">
        <h2 className="text-xl font-bold mb-5 text-gray-800">Plan Your Route</h2>

        <div className="mb-4">
          <label htmlFor="currentLocationDisplay" className="block text-sm font-semibold text-gray-700 mb-1">
            Current Location
          </label>
          <div
            id="currentLocationDisplay"
            onClick={onNavigateToCurrentLocationSelection}
            tabIndex={0}
            role="button"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent placeholder-gray-400 min-h-[46px] flex items-center"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigateToCurrentLocationSelection(); }}
            aria-label={`Current Location: ${currentLocation || 'Not selected'}. Click to change.`}
          >
            {currentLocation || <span className="text-gray-400">Select current location</span>}
          </div>
        </div>

        <div className={showSpecificRoomArea ? "mb-4" : "mb-8"}>
          <label htmlFor="destinationDisplay" className="block text-sm font-semibold text-gray-700 mb-1">
            Destination
          </label>
          <div
            id="destinationDisplay"
            onClick={onNavigateToDestinationSelection}
            tabIndex={0}
            role="button"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent placeholder-gray-400 min-h-[46px] flex items-center"
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigateToDestinationSelection(); }}
            aria-label={`Destination: ${destination || 'Not selected'}. Click to change.`}
          >
            {destination || <span className="text-gray-400">Select destination</span>}
          </div>
        </div>

        {showSpecificRoomArea && (
          <div className="mb-8">
            <label htmlFor={useRoomSelectionUI ? "specificRoomDisplay" : "specificRoomInput"} className="block text-sm font-semibold text-gray-700 mb-1">
              {specificRoomLabel}
            </label>
            {useRoomSelectionUI ? (
              <div
                id="specificRoomDisplay"
                onClick={onNavigateToSpecificRoomSelection}
                tabIndex={0}
                role="button"
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white cursor-pointer focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent placeholder-gray-400 min-h-[46px] flex items-center"
                onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onNavigateToSpecificRoomSelection(); }}
                aria-label={`Specific ${specificRoomSelectionAriaLabelSuffix}: ${specificRoom || 'Not selected'}. Click to select from a list.`}
              >
                {specificRoom || <span className="text-gray-400">{specificRoomSelectionPlaceholderText}</span>}
              </div>
            ) : (
              <input
                type="text"
                id="specificRoomInput"
                value={specificRoom}
                onChange={(e) => onSpecificRoomChange(e.target.value)}
                placeholder={specificRoomPlaceholderText}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent placeholder-gray-400 min-h-[46px]"
                aria-label={`Enter specific ${specificRoomAriaLabelSuffix}, optional`}
              />
            )}
          </div>
        )}

        <button
          onClick={handleStartNavigation}
          className="w-full bg-custom-indigo text-white font-semibold py-3.5 px-4 rounded-full shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-75 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={isNavigationDisabled}
          aria-disabled={isNavigationDisabled}
          aria-label="Start navigation to the selected destination"
        >
          Start Navigation
        </button>
      </main>
    </div>
  );
};

export default HomeScreen;