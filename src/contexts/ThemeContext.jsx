import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';

export const ThemeProvider = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
  }, [isLoaded]);

  if (!isLoaded) {
    return <div className="min-h-screen bg-white"></div>;
  }

  return (
    <ThemeContext.Provider>
      {children}
    </ThemeContext.Provider>
  );
}; 