import React, { useState } from 'react';
import Watchlist from './Watchlist';
import {VscThreeBars} from 'react-icons/vsc';
function SideBar() {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="flex z-50">
      {/* Sidebar */}
      <div
        className={`bg-gray-200 w-64 h-screen fixed top-0 left-0 transform transition-transform duration-300 ease-in-out ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        
            <Watchlist/>
            
      </div>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Main content */}
        {/* ... */}
      </div>

      <button
      style={{color:'#76d18f'}}
        className="top-4 left-4  px-10 py-2 rounded"
        onClick={toggleSidebar}
      >
        <VscThreeBars/>
      </button>
    </div>
  );
}

export default SideBar;
