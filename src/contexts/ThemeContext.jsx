import { useState, useEffect } from 'react';
import { ThemeContext } from './ThemeContext.js';

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(false); // Start with false to avoid hydration mismatch
  const [isLoaded, setIsLoaded] = useState(false);

  // Initialize theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    let shouldBeDark = false;
    
    if (savedTheme) {
      shouldBeDark = savedTheme === 'dark';
    } else {
      shouldBeDark = prefersDark;
    }
    
    setIsDark(shouldBeDark);
    setIsLoaded(true);
    
    // Apply theme to document
    const root = window.document.documentElement;
    if (shouldBeDark) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  // Update theme when isDark changes
  useEffect(() => {
    if (!isLoaded) return; // Don't run on initial render
    
    const root = window.document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDark, isLoaded]);

  const toggleTheme = () => {
    setIsDark(prev => !prev);
  };

  // Don't render until theme is loaded to prevent flash
  if (!isLoaded) {
    return <div className="min-h-screen bg-white dark:bg-gray-900"></div>;
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 