
import React, { useState, useEffect, useRef } from 'react';
import { BackArrowIcon } from './icons';
import { locations } from './locationData'; // Import locations to check for hostels

interface RoomSelectionPageProps {
  buildingName: string;
  allRooms: string[];
  currentSelectedRoom: string;
  onConfirm: (room: string) => void;
  onCancel: () => void;
  onClearSelection: () => void;
}

const HEADER_HEIGHT_APPROX = "64px"; // Approximate height of the header (py-4 + text-xl). Adjust if header changes.

const RoomSelectionPage: React.FC<RoomSelectionPageProps> = ({
  buildingName,
  allRooms,
  currentSelectedRoom,
  onConfirm,
  onCancel,
  onClearSelection,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState<string[]>(allRooms);
  const pageTitleRef = useRef<HTMLHeadingElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const firstRoomItemRef = useRef<HTMLButtonElement>(null);
  const noResultsRef = useRef<HTMLParagraphElement>(null);

  const isHostel = locations.Hostel.some(item => item.name === buildingName); // Corrected check

  useEffect(() => {
    setFilteredRooms(
      allRooms.filter(room =>
        room.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, allRooms]);

  useEffect(() => {
    if (pageTitleRef.current) {
      pageTitleRef.current.focus();
    }
    const timer = setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  const handleRoomClick = (room: string) => {
    onConfirm(room);
  };

  return (
    <div className="flex flex-col h-screen bg-slate-50 font-sans">
      {/* Sticky Header */}
      <header className="bg-white py-4 px-4 shadow-sm grid grid-cols-3 items-center sticky top-0 z-20">
        <div className="justify-self-start">
          <button
            onClick={onCancel}
            className="text-custom-indigo p-2 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors"
            aria-label="Back to home screen without selecting a room"
          >
            <BackArrowIcon className="h-5 w-5" />
          </button>
        </div>
        <h1 ref={pageTitleRef} tabIndex={-1} className="text-xl font-bold text-center text-custom-indigo whitespace-nowrap overflow-hidden text-ellipsis">
          Select Room in {buildingName}
        </h1>
        <div className="justify-self-end">
          <button
            onClick={onClearSelection}
            className="text-custom-indigo font-medium py-2 px-3 rounded-md hover:bg-custom-indigo/10 focus:outline-none focus:ring-2 focus:ring-custom-indigo/50 transition-colors text-sm sm:text-base"
            aria-label="Clear room selection and return to home screen"
          >
            Clear/Skip
          </button>
        </div>
      </header>

      {/* Sticky Search Bar Area */}
      <div 
        className="p-4 bg-slate-100 border-b border-gray-200 sticky z-10" 
        style={{ top: HEADER_HEIGHT_APPROX }}
      >
        <input
          ref={searchInputRef}
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search room or office..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm bg-white focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent"
          aria-label={`Search for room or office in ${buildingName}`}
        />
      </div>

      {/* Scrollable Content Area */}
      <main className="flex-grow overflow-y-auto pt-2 pb-4 px-4">
        {filteredRooms.length > 0 ? (
          <div className={isHostel ? "grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2" : "space-y-3"}>
            {filteredRooms.map((room, index) => (
              <button
                key={room}
                ref={index === 0 ? firstRoomItemRef : null}
                onClick={() => handleRoomClick(room)}
                className={`w-full rounded-lg shadow hover:shadow-md focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:border-transparent transition-all duration-150 ease-in-out ${
                  room === currentSelectedRoom ? 'bg-custom-indigo/20 border-custom-indigo ring-2 ring-custom-indigo' : 'bg-white'
                } ${
                  isHostel 
                    ? 'p-2.5 text-xs text-center min-h-[48px] flex items-center justify-center' 
                    : 'p-4 text-left'
                }`}
                aria-label={`Select room: ${room}`}
                aria-pressed={room === currentSelectedRoom}
              >
                <span className={`font-semibold ${isHostel ? 'text-gray-700' : 'text-lg text-gray-700'}`}>{room}</span>
              </button>
            ))}
          </div>
        ) : (
          <p ref={noResultsRef} tabIndex={-1} className="text-center text-gray-600 mt-6 text-lg">
            No matching rooms or offices found for "{searchTerm}".
          </p>
        )}
      </main>
    </div>
  );
};

export default RoomSelectionPage;