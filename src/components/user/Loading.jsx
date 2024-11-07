// src/components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="loading-spinner">
        <div className="spinner"></div>
        <p className="text-gray-600 text-lg mt-4">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
