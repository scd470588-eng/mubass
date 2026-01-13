
import React, { useEffect, useRef } from 'react';
import { buildingRoomData } from './roomData'; 
import { locations } from './locationData'; 
import { BackArrowIcon } from './icons';

interface LocationDetailsPageProps {
  locationName: string;
  onBack: () => void;
  onNavigateToRoomDirections: (destinationName: string, roomName: string) => void;
}

const LocationDetailsPage: React.FC<LocationDetailsPageProps> = ({ 
  locationName, 
  onBack,
  onNavigateToRoomDirections,
}) => {
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const firstContentElementRef = useRef<HTMLHeadingElement>(null); 

  const roomsAndOffices = buildingRoomData[locationName] || [];
  
  let imageUrl: string | undefined = undefined;
  Object.values(locations).forEach(items => {
    const item = items.find(loc => loc.name === locationName);
    if (item && item.imageUrl) {
      imageUrl = item.imageUrl;
    }
  });


  useEffect(() => {
    pageTitleRef.current?.focus();
    const timer = setTimeout(() => {
      // Focus the main heading within content area for better UX
      // or the first interactive element if available and makes sense.
      const focusTarget = firstContentElementRef.current || document.querySelector<HTMLElement>('.location-details-content button, .location-details-content [href], .location-details-content input');
      focusTarget?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [locationName]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <header className="bg-white py-4 px-4 shadow-sm sticky top-0 z-10">
        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <button
              onClick={onBack}
              className="flex items-center text-custom-indigo p-2 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
              aria-label={`Go back to locations list`}
            >
              <BackArrowIcon className="h-5 w-5" />
            </button>
          </div>
          <h1 ref={pageTitleRef} tabIndex={-1} className="text-xl font-bold text-center text-custom-indigo whitespace-nowrap overflow-hidden text-ellipsis">
            {locationName}
          </h1>
          <div className="justify-self-end">
            {/* Placeholder */}
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-6 location-details-content">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="w-full h-48 md:h-64 bg-gray-200 flex items-center justify-center text-gray-500"
            aria-label={`Placeholder image for ${locationName}`}
          >
            {imageUrl ? (
              <img src={imageUrl} alt={locationName} className="w-full h-full object-cover"/>
            ) : (
              <span>Main Image for {locationName}</span>
            )}
          </div>
          
          <div className="p-4 md:p-6">
            <h2 ref={firstContentElementRef} tabIndex={-1} className="text-2xl font-bold text-custom-indigo mb-4">
              Details for {locationName}
            </h2>

            {roomsAndOffices.length > 0 ? (
              <>
                <h3 className="text-lg font-semibold text-gray-700 mb-3">Rooms & Offices:</h3>
                <ul className="space-y-2">
                  {roomsAndOffices.map((item, index) => (
                    <li 
                      key={index} 
                      className="flex justify-between items-center bg-gray-50 p-3 rounded-md shadow-sm"
                    >
                      <span className="text-gray-700">{item}</span>
                      <button
                        onClick={() => onNavigateToRoomDirections(locationName, item)}
                        className="text-sm text-custom-indigo font-medium py-1.5 px-3 rounded-md border border-custom-indigo hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
                        aria-label={`View directions to ${item} in ${locationName}`}
                      >
                        View Directions
                      </button>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <div className="text-center py-4">
                <p className="text-gray-600 mt-2 mb-4">
                  This is a general area or specific rooms/offices are not listed.
                </p>
                <button
                  onClick={() => onNavigateToRoomDirections(locationName, '')}
                  className="bg-custom-indigo text-white font-semibold py-2.5 px-5 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-75 transition-colors duration-150"
                  aria-label={`View directions to ${locationName}`}
                >
                  View Directions to {locationName}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default LocationDetailsPage;
