
import React from 'react';

const defaultIconProps: React.SVGProps<SVGSVGElement> = {
  className: "w-8 h-8 mr-4 text-custom-indigo", // Increased size and consistent color
  fill: "currentColor",
  viewBox: "0 0 24 24",
};

const defaultInlineIconProps: React.SVGProps<SVGSVGElement> = { // For icons used inline with text or smaller contexts
  className: "w-5 h-5", // Default size for inline icons
  fill: "none",
  viewBox: "0 0 24 24",
  stroke: "currentColor",
  strokeWidth: "2",
};


export const BuildingIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z"></path>
  </svg>
);

export const CafeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    <path d="M20 3H4v10c0 2.21 1.79 4 4 4h6c2.21 0 4-1.79 4-4v-3h2c1.11 0 2-.89 2-2V5c0-1.11-.89-2-2-2zm0 5h-2V5h2v3zM4 19h16v2H4v-2z"></path>
  </svg>
);

export const GateIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21V10m0 0H6.375M12 10h5.625M12 21A8.25 8.25 0 004.5 12.75V9A2.25 2.25 0 016.75 6.75h10.5A2.25 2.25 0 0119.5 9v3.75A8.25 8.25 0 0012 21z" />
  </svg>
);


export const HostelIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    <path d="M12 5.5l6 4.5v9H6v-9l6-4.5M12 3L4 9v12h16V9L12 3zm4 10h-2v-2h2v2zm-4 0H8v-2h2v2zm0 4H8v-2h2v2zm4 0h-2v-2h2v2z"></path>
  </svg>
);

// Updated OfficeIcon to an "open book" style icon
export const OfficeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    {/* Heroicons "book-open" (solid variant adapted) or similar simple open book */}
    <path d="M18.5 2H5.5C4.12 2 3 3.12 3 4.5v15C3 20.88 4.12 22 5.5 22h13c1.38 0 2.5-1.12 2.5-2.5v-15C21 3.12 19.88 2 18.5 2zM10 4h4v5h-4V4zm9 15.5c0 .28-.22.5-.5.5H5.5c-.28 0-.5-.22-.5-.5v-13c0-.28.22-.5.5-.5H8v5.5C8 12.33 8.67 13 9.5 13h5c.83 0 1.5-.67 1.5-1.5V6h2.5c.28 0 .5.22.5.5v13z"></path>
  </svg>
);

export const LaboratoriesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21V5.25m0 0A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25v1.5c0 .359-.06.702-.174 1.024M7.5 5.25a2.25 2.25 0 00-2.25-2.25H3v10.5h1.5a2.25 2.25 0 002.25-2.25V5.25z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75H12V12h2.25V9.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 12.75H12V15h2.25V12.75z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 15.75H12V18h2.25V15.75z" />
  </svg>
);

// Updated ServicesIcon to a "hospital" style icon
export const ServicesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    {/* Material Design "local_hospital" icon */}
    <path d="M19 3H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-1 11h-4v4h-4v-4H6v-4h4V6h4v4h4v4z"></path>
  </svg>
);


export const ClinicIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...defaultIconProps} {...props}>
    <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v6.5h6.5a.75.75 0 010 1.5h-6.5v6.5a.75.75 0 01-1.5 0v-6.5h-6.5a.75.75 0 010-1.5h6.5v-6.5A.75.75 0 0110 2z" clipRule="evenodd" />
  </svg>
);

export const BackArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    {...defaultInlineIconProps} // Use smaller default for inline context
    {...props} // Allow overriding className or other props
    className={`${defaultInlineIconProps.className} ${props.className || ''}`} // Combine default and passed classNames
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

export const CloseIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    {...defaultInlineIconProps} // Use smaller default for inline context
    {...props} // Allow overriding className or other props
    className={`${defaultInlineIconProps.className} ${props.className || ''}`} // Combine default and passed classNames
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
  </svg>
);
