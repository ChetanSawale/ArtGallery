import React from 'react';
import ContinuousImageSlider from './ContinuousImageSlider'; // Or your component's name

// This component now acts as a wrapper to pass props
export default function Home({ user, isDarkMode }) {
  return (
    <div>
      <ContinuousImageSlider user={user} isDarkMode={isDarkMode} />
    </div>
  );
}
