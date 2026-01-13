
import React, { useEffect, useRef } from 'react';
import { locationCategories, LocationCategory, locations } from './locationData';
import { BuildingIcon, CafeIcon, GateIcon, HostelIcon, OfficeIcon, LaboratoriesIcon, ServicesIcon, BackArrowIcon } from './icons';

interface ExplorePageProps {
  onSelectCategory: (category: LocationCategory) => void;
  onBack: () => void;
}

const categoryIcons: Record<LocationCategory, React.FC<React.SVGProps<SVGSVGElement>>> = {
  "Building": BuildingIcon, 
  "Cafe & Shops": CafeIcon,
  "Gate": GateIcon,
  "Hostel": HostelIcon,
  "Office": OfficeIcon,
  "Laboratories & Workshops": LaboratoriesIcon, 
  "Services": ServicesIcon,
};

const ExplorePage: React.FC<ExplorePageProps> = ({ onSelectCategory, onBack }) => {
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const firstCategoryButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (pageTitleRef.current) {
      pageTitleRef.current.focus();
    }
    const timer = setTimeout(() => {
      firstCategoryButtonRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col h-full bg-slate-50 font-sans">
      <header className="bg-custom-indigo text-white py-4 px-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex items-center">
          <button
            onClick={onBack}
            className="text-white p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
            aria-label="Go back to home screen"
          >
            <BackArrowIcon className="h-5 w-5" />
          </button>
          <h1 ref={pageTitleRef} tabIndex={-1} className="text-xl font-bold text-center flex-grow pl-4">
            Explore mubasss
          </h1>
          <div className="w-10"></div> 
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-2 gap-4">
          {locationCategories.map((category, index) => {
            const IconComponent = categoryIcons[category] || BuildingIcon; 
            const locationCount = locations[category]?.length || 0; 
            return (
              <button
                key={category}
                ref={index === 0 ? firstCategoryButtonRef : null}
                onClick={() => onSelectCategory(category)}
                className="w-full flex flex-col items-center justify-center text-center bg-white p-4 rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent transition-all duration-150 ease-in-out h-40"
                aria-label={`Explore category: ${category}. ${locationCount} locations.`}
              >
                <IconComponent aria-hidden="true" className="w-10 h-10 mb-2 text-custom-indigo" />
                <div className="flex-grow flex flex-col justify-center">
                  <span className="text-md font-semibold text-gray-800 block">{category}</span>
                  <p className="text-xs text-gray-500">{locationCount} locations</p>
                </div>
              </button>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ExplorePage;
