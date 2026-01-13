
import React, { useState, useEffect, useRef } from 'react';
import { locations, locationCategories, LocationCategory, LocationItem } from './locationData';
import { BackArrowIcon, CloseIcon } from './icons'; // Import CloseIcon

interface LocationSelectionPageProps {
  pageTitle: string;
  onLocationConfirm: (location: string) => void;
  onCancel: () => void;
  selectionContext: 'current' | 'destination'; // New prop
}

const LocationSelectionPage: React.FC<LocationSelectionPageProps> = ({
  pageTitle,
  onLocationConfirm,
  onCancel,
  selectionContext, // Use the new prop
}) => {
  const [step, setStep] = useState<'category' | 'location'>('category');
  const [selectedCategory, setSelectedCategory] = useState<LocationCategory | null>(null);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const firstFocusableElementRef = useRef<HTMLElement>(null); // Changed type here

  const dynamicHeaderTitle = step === 'category' ? pageTitle : `Select Location in ${selectedCategory || 'Category'}`;

  // Filter categories based on context
  const availableCategories = selectionContext === 'current'
    ? locationCategories.filter(category => category !== 'Office')
    : locationCategories;

  useEffect(() => {
    if (pageTitleRef.current) {
      pageTitleRef.current.focus(); // Focus the title for screen readers
    }
    // Delay focus to the first interactive element to allow title to be read
    const timer = setTimeout(() => {
      firstFocusableElementRef.current?.focus();
    }, 50); // Small delay
    
    return () => clearTimeout(timer);
  }, [step, selectedCategory, pageTitle]); // Rerun when step or selectedCategory changes

  const handleCategoryClick = (category: LocationCategory) => {
    setSelectedCategory(category);
    setStep('location');
  };

  const handleLocationClick = (locationName: string) => {
    onLocationConfirm(locationName);
  };

  const handleBackToCategories = () => {
    setStep('category');
    setSelectedCategory(null);
  };

  const currentLocations: LocationItem[] = selectedCategory ? locations[selectedCategory] : [];

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      <header 
        className="bg-white py-4 px-4 shadow-sm grid items-center sticky top-0 z-10 gap-x-2 sm:gap-x-4"
        style={{ gridTemplateColumns: 'auto 1fr auto' }}
      >
        <div className="justify-self-start">
          {step === 'location' && (
            <button
              ref={firstFocusableElementRef as React.RefObject<HTMLButtonElement>}
              onClick={handleBackToCategories}
              className="flex items-center text-custom-indigo p-2 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
              aria-label="Go back to category selection"
            >
              <BackArrowIcon className="h-5 w-5" />
            </button>
          )}
        </div>
        <h1 ref={pageTitleRef} tabIndex={-1} className="text-xl font-bold text-center text-custom-indigo whitespace-nowrap overflow-hidden text-ellipsis">
          {dynamicHeaderTitle}
        </h1>
        <div className="justify-self-end">
          <button
            onClick={onCancel}
            className="flex items-center text-custom-indigo p-2 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
            aria-label="Cancel selection and return to home screen"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        {step === 'category' && (
          <div className="space-y-3">
            {availableCategories.length > 0 ? (
              availableCategories.map((category, index) => (
                <button
                  key={category}
                  ref={index === 0 && step === 'category' ? firstFocusableElementRef as React.RefObject<HTMLButtonElement> : null}
                  onClick={() => handleCategoryClick(category)}
                  className="w-full text-left bg-white p-4 rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent transition-all duration-150 ease-in-out"
                  aria-label={`Select category: ${category}`}
                >
                  <span className="text-lg font-semibold text-gray-700">{category}</span>
                </button>
              ))
            ) : (
              <p 
                className="text-center text-gray-600 mt-10 text-lg"
                ref={step === 'category' ? firstFocusableElementRef as React.RefObject<HTMLParagraphElement> : null}
                tabIndex={-1}
              >
                No categories available for selection.
              </p>
            )}
          </div>
        )}

        {step === 'location' && selectedCategory && (
          <div className="space-y-3">
            {currentLocations.length > 0 ? (
              currentLocations.map((location, index) => (
                <button
                  key={location.name} // Changed from location to location.name
                  ref={index === 0 && step === 'location' ? firstFocusableElementRef as React.RefObject<HTMLButtonElement> : null}
                  onClick={() => handleLocationClick(location.name)} // Changed from location to location.name
                  className="w-full text-left bg-white p-4 rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent transition-all duration-150 ease-in-out"
                  aria-label={`Select location: ${location.name}`}
                >
                  <span className="text-lg font-semibold text-gray-700">{location.name}</span> {/* Changed from location to location.name */}
                </button>
              ))
            ) : (
              <p 
                className="text-center text-gray-600 mt-10 text-lg"
                ref={step === 'location' ? firstFocusableElementRef as React.RefObject<HTMLParagraphElement> : null}
                tabIndex={-1}
              >
                No locations found in {selectedCategory}. You can add them in <code>locationData.ts</code>.
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default LocationSelectionPage;
