
import React from 'react';

interface FooterNavProps {
  activeTab: 'home' | 'explore';
  onNavigateToHome: () => void;
  onNavigateToExplore: () => void;
}

const FooterNav: React.FC<FooterNavProps> = ({ activeTab, onNavigateToHome, onNavigateToExplore }) => {
  return (
    <footer className="bg-white border-t border-gray-200 py-4 px-6 sticky bottom-0 z-20">
      <nav className="flex justify-around">
        <button
          onClick={onNavigateToHome}
          aria-current={activeTab === 'home' ? 'page' : undefined}
          className={`font-semibold focus:outline-none focus:underline ${
            activeTab === 'home' ? 'text-custom-indigo' : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Go to Home screen"
        >
          Home
        </button>
        <button
          onClick={onNavigateToExplore}
          aria-current={activeTab === 'explore' ? 'page' : undefined}
          className={`font-semibold focus:outline-none focus:underline ${
            activeTab === 'explore' ? 'text-custom-indigo' : 'text-gray-500 hover:text-gray-700'
          }`}
          aria-label="Explore mubasss locations and services"
        >
          Explore
        </button>
      </nav>
    </footer>
  );
};

export default FooterNav;
