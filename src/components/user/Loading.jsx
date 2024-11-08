// src/components/Loading.js
import React from 'react';

const Loading = () => {
  return (
    <div className="loading-container flex items-center justify-center min-h-screen bg-gray-100">
      <div className="loading-spinner text-center">
        <div className="spinner mb-6"></div>
        <p className="text-gray-600 text-xl font-medium">Loading, please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
