




import React, { useState, useEffect, useCallback, useRef } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BackArrowIcon } from './icons';
import { paths as predefinedPathMappings } from './predefinedPaths';
import { predefinedNavigationSteps, PredefinedStepData } from './navigationStepsData';
import { stepGroups, StepInstruction } from './stepGroupsData';
import { roomStepGroupMap } from './roomStepGroupMap';
import { destinationArrivalStepMap } from './destinationArrivalStepMap';
import { locations } from './locationData';

interface NavigationPageProps {
  currentLocation: string;
  destination: string;
  specificRoom?: string;
  onBack: () => void;
}

const NavigationPage: React.FC<NavigationPageProps> = ({
  currentLocation,
  destination,
  specificRoom,
  onBack,
}) => {
  const [instructions, setInstructions] = useState<StepInstruction[] | null>(null);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const stepDescriptionRef = useRef<HTMLParagraphElement>(null);


  const fetchDirections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    setInstructions(null);
    setCurrentStepIndex(0); // Reset step index on new fetch

    // Handle navigation within the same building from its entrance
    if (currentLocation === destination) {
        if (specificRoom && specificRoom.trim() !== "") {
            const roomName = specificRoom.trim();
            const stepGroupName = roomStepGroupMap[destination]?.[roomName];
            const roomSpecificSteps = stepGroupName ? stepGroups[stepGroupName] : null;

            if (roomSpecificSteps) {
                // We found steps from the entrance to the room.
                setInstructions(roomSpecificSteps);
            } else {
                // No specific steps found for this room. Provide a generic instruction.
                setInstructions([{
                    description: `You are already at ${destination}. Please proceed to ${roomName} from the building's main entrance.`,
                    imageUrl: undefined
                }]);
            }
        } else {
            // This case should be prevented by the HomeScreen logic, but it's a safe fallback.
            setError("You have selected the same location for start and destination without specifying a room. Please go back and select a room or a different destination.");
        }
        setIsLoading(false);
        return; // Stop execution here for same-building navigation
    }

    const pathData = predefinedPathMappings[currentLocation]?.[destination];
    
    // Handle array-based predefined path
    if (Array.isArray(pathData) && pathData.length > 0) {
        const describedSteps = pathData.map(stepNumber => {
            const stepData: PredefinedStepData | undefined = predefinedNavigationSteps[stepNumber];
            if (!stepData) {
                console.warn(`No description object found for step number: ${stepNumber} in predefined path from ${currentLocation} to ${destination}.`);
                return { description: `Step ${stepNumber}: Description missing. Contact admin.`, imageUrl: undefined };
            }
            return { description: stepData.description, imageUrl: stepData.imageUrl };
        });

        let finalInstructions: StepInstruction[] = describedSteps;

        // Check if we are entering Administration Block from the back (Step 22)
        const isBackEntranceAdmin = destination === "Administration Block" && pathData.includes(22);
        // Check if we are entering Wet Building from the back (Step 32)
        const isBackEntranceWet = destination === "Wet Building (WET)" && pathData.includes(32);

        // Add the "You have arrived" message for the main destination, before room steps.
        // Skip this if entering Admin Block or Wet Building from the back.
        if (!isBackEntranceAdmin && !isBackEntranceWet) {
            const arrivalStepNumber = destinationArrivalStepMap[destination];
            if (arrivalStepNumber) {
              const arrivalStepData = predefinedNavigationSteps[arrivalStepNumber];
              if (arrivalStepData) {
                finalInstructions.push({ description: arrivalStepData.description, imageUrl: arrivalStepData.imageUrl });
              } else {
                console.warn(`No description object found for arrival step number: ${arrivalStepNumber}`);
              }
            }
        }
        
        if (specificRoom && specificRoom.trim() !== "") {
            const roomName = specificRoom.trim();

            if (destination === "Main Lecture Theatre (MLT)" && roomName === "Main Entrance") {
                // Special case: If destination is MLT and room is Main Entrance,
                // the main arrival message for MLT is sufficient. No further steps are needed.
            } else {
                let stepGroupName = roomStepGroupMap[destination]?.[roomName];

                // If entering Admin Block or Wet Building from back, try to find the specific "back" steps for the room
                if ((isBackEntranceAdmin || isBackEntranceWet) && stepGroupName) {
                    const backGroupName = `${stepGroupName}back`;
                    if (stepGroups[backGroupName]) {
                        stepGroupName = backGroupName;
                    }
                }

                const roomSpecificSteps = stepGroupName ? stepGroups[stepGroupName] : null;

                if (roomSpecificSteps) {
                    // If a specific step group is found for the room, append it
                    finalInstructions = [...finalInstructions, ...roomSpecificSteps];
                } else {
                    // Fallback to the generic "proceed to" instruction if no specific group is found
                    if (!destination.toLowerCase().includes(roomName.toLowerCase())) {
                        finalInstructions.push({ description: `Once at ${destination}, proceed to ${roomName}.`, imageUrl: undefined });
                    }
                }
            }
        }
        
        setInstructions(finalInstructions);
        setIsLoading(false);
        return;
    }


    if (!process.env.API_KEY) {
      setError("API Key is not configured. Please ensure process.env.API_KEY is set.");
      setIsLoading(false);
      return;
    }

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let prompt = `Provide step-by-step walking directions from "${currentLocation}" to "${destination}"`;
    if (specificRoom && specificRoom.trim() !== "") {
      prompt += `, specifically to room/office "${specificRoom.trim()}",`;
    }
    prompt += ` at MUBAS (Malawi University of Business and Applied Sciences). Format the response as a clear, numbered list of actions. Each step should be on a new line. Avoid any introductory or concluding sentences, just provide the numbered list.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      const textResponse = response.text;
      if (textResponse) {
        const lines = textResponse.split('\n').filter(line => {
          const trimmedLine = line.trim();
          return trimmedLine !== '' && !/^(\d+\.|-|\*)\s*$/.test(trimmedLine);
        }).map(line => ({ description: line.replace(/^\d+\.\s*/, ''), imageUrl: undefined })); // Remove numbering and add undefined imageUrl

        if (lines.length > 0) {
          setInstructions(lines);
        } else {
          setError('Could not find a route. The directions received were empty or contained no valid steps.');
        }
      } else {
        setError('Could not retrieve directions. No response text received.');
      }
    } catch (e: any) {
      console.error('Error fetching directions:', e);
      setError(`Failed to fetch directions: ${e.message || 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }
  }, [currentLocation, destination, specificRoom]);

  useEffect(() => {
    fetchDirections();
  }, [fetchDirections]);

  useEffect(() => {
    // When current step changes, focus the description for screen readers
    stepDescriptionRef.current?.focus();
  }, [currentStepIndex, instructions]);

  const handleNextStep = () => {
    if (instructions && currentStepIndex < instructions.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
    }
  };
  
  const currentStepData = instructions?.[currentStepIndex];

  // Determine if specificRoom is an Office or a Room
  const isOffice = specificRoom && locations["Office"]?.some(office => office.name === specificRoom.trim());
  const roomLabel = isOffice ? "Office" : "Room";

  return (
    <div className="flex flex-col h-screen bg-slate-100 font-sans">
      <header className="bg-custom-indigo text-white py-4 px-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto grid grid-cols-[auto_1fr_auto] items-center gap-x-2 sm:gap-x-4">
          {/* Left: Back Button */}
          <div className="justify-self-start">
            <button
              onClick={onBack}
              className="text-white p-2 rounded-md hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 transition-colors"
              aria-label="Go back to home screen"
            >
              <BackArrowIcon className="h-5 w-5" />
            </button>
          </div>

          {/* Center: Step Progress */}
          <div className="text-center">
            {instructions && instructions.length > 0 ? (
              <span className="text-sm font-medium text-white" aria-live="polite"> 
                Step {currentStepIndex + 1} of {instructions.length}
              </span>
            ) : (
              <span>&nbsp;</span> // Placeholder to maintain layout consistency
            )}
          </div>

          {/* Right: Spacer to balance the back button for true centering */}
          <div className="justify-self-end">
            <div className="p-2 opacity-0 pointer-events-none" aria-hidden="true">
              <BackArrowIcon className="h-5 w-5" /> {/* Same size as the real back arrow icon */}
            </div>
          </div>
        </div>
      </header>

      <main className="flex-grow overflow-y-auto p-4 md:p-6 flex flex-col" aria-live="polite">
        {isLoading && (
          <div className="text-center py-10 flex-grow flex flex-col justify-center items-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-custom-indigo mb-4"></div>
            <p className="text-lg font-semibold text-gray-700">Generating your route...</p>
            <p className="text-sm text-gray-500">Please wait a moment.</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow m-auto" role="alert">
            <p className="font-bold mb-2">Error</p>
            <p className="mb-3">{error}</p>
            <button
              onClick={fetchDirections}
              className="bg-red-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition-colors"
              aria-label="Retry fetching directions"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !error && instructions && instructions.length > 0 && currentStepData && (
          <div className="flex flex-col flex-grow bg-white p-4 md:p-6 rounded-xl shadow-lg">
            {/* Route Details Summary */}
            <div className="mb-4 pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600">
                <span className="font-medium">From:</span> {currentLocation}
              </p>
              <p className="text-sm text-gray-600">
                <span className="font-medium">To:</span> {destination}
                {specificRoom && specificRoom.trim() !== "" && (
                  <span className="text-xs text-gray-500"> ({roomLabel}: {specificRoom.trim()})</span>
                )}
              </p>
            </div>

            {/* Step Image Area */}
            <div 
              className="w-full aspect-square bg-gray-200 rounded-lg mb-4 flex items-center justify-center text-gray-500 overflow-hidden"
              aria-label={`Visual guide for step ${currentStepIndex + 1}`}
            >
              {currentStepData.imageUrl ? (
                <img 
                  src={currentStepData.imageUrl} 
                  alt={`Visual guide for: ${currentStepData.description}`} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-center p-4">Image placeholder for Step {currentStepIndex + 1}</span>
              )}
            </div>

            {/* Step Description */}
            <p ref={stepDescriptionRef} tabIndex={-1} className="text-lg text-gray-800 mb-6 flex-grow leading-relaxed text-center">
              {currentStepData.description}
            </p>
            
            {/* Navigation Controls */}
            <div className="mt-auto">
              <div className="flex justify-between items-center pt-3">
                <button
                  onClick={handlePreviousStep}
                  disabled={currentStepIndex === 0}
                  className="bg-custom-indigo text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-75 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Previous step"
                >
                  Previous
                </button>
                <button
                  onClick={handleNextStep}
                  disabled={currentStepIndex === instructions.length - 1}
                  className="bg-custom-indigo text-white font-semibold py-2.5 px-6 rounded-lg shadow-md hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-custom-indigo focus:ring-opacity-75 transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Next step"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
         {!isLoading && !error && (!instructions || instructions.length === 0) && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 text-yellow-700 p-4 rounded-md shadow m-auto" role="alert">
                <p className="font-bold">No Directions</p>
                <p>Could not generate or find directions for the selected route. Try different locations.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default NavigationPage;
