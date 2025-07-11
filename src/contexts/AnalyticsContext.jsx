import { createContext, useContext } from 'react';

export const AnalyticsContext = createContext({
  trackEvent: () => {}
});

// Helper hook for easier context consumption
export const useAnalytics = () => useContext(AnalyticsContext);