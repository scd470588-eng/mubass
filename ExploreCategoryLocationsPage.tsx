
import React, { useEffect, useRef } from 'react';
import { LocationCategory, locations, LocationItem } from './locationData';
import { BackArrowIcon } from './icons';

interface ExploreCategoryLocationsPageProps {
  categoryName: LocationCategory;
  onExploreLocation: (locationName: string) => void;
  onBack: () => void;
}

const ExploreCategoryLocationsPage: React.FC<ExploreCategoryLocationsPageProps> = ({ 
  categoryName, 
  onExploreLocation, 
  onBack 
}) => {
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const firstLocationCardRef = useRef<HTMLButtonElement>(null);

  const categoryLocations: LocationItem[] = locations[categoryName] || [];

  useEffect(() => {
    pageTitleRef.current?.focus();
    const timer = setTimeout(() => {
      firstLocationCardRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, [categoryName]);

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <header className="bg-white py-4 px-4 shadow-sm sticky top-0 z-10">
        <div className="grid grid-cols-3 items-center">
          <div className="justify-self-start">
            <button
              onClick={onBack}
              className="flex items-center text-custom-indigo p-2 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
              aria-label={`Go back to explore categories`}
            >
              <BackArrowIcon className="h-5 w-5" />
            </button>
          </div>
          <h1 ref={pageTitleRef} tabIndex={-1} className="text-xl font-bold text-center text-custom-indigo whitespace-nowrap overflow-hidden text-ellipsis">
            {categoryName}
          </h1>
          <div className="justify-self-end">
            {/* Placeholder for potential actions */}
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        {categoryLocations.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {categoryLocations.map((location, index) => (
              <div key={location.name} className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
                <div 
                  className="w-full h-40 bg-gray-200 flex items-center justify-center text-gray-500"
                  aria-label={`Placeholder image for ${location.name}`}
                >
                  {location.imageUrl ? (
                    <img src={location.imageUrl} alt={location.name} className="w-full h-full object-cover"/>
                  ) : (
                    <span>Image for {location.name}</span>
                  )}
                </div>
                <div className="p-4 flex-grow flex flex-col justify-between">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2 truncate" title={location.name}>{location.name}</h2>
                  <button
                    ref={index === 0 ? firstLocationCardRef : null}
                    onClick={() => onExploreLocation(location.name)}
                    className="mt-auto w-full bg-custom-indigo text-white font-semibold py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-75 transition-colors duration-150"
                    aria-label={`Explore details for ${location.name}`}
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p 
            ref={firstLocationCardRef as any} // Use a more appropriate ref if needed, or focus programmatically
            tabIndex={0}
            className="text-center text-gray-600 mt-10 text-lg"
          >
            No locations found in {categoryName}.
          </p>
        )}
      </main>
    </div>
  );
};

export default ExploreCategoryLocationsPage;
