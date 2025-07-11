import { useEffect } from 'react';
import { AnalyticsContext } from '../contexts/AnalyticsContext';

export function AnalyticsProvider({ children }) {
  useEffect(() => {
    if (!window.gtag && import.meta.env.VITE_GA_MEASUREMENT_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_MEASUREMENT_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      window.gtag = function() { dataLayer.push(arguments); };
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_MEASUREMENT_ID);
    }
  }, []);

  const trackEvent = (eventName, eventParams) => {
    if (window.gtag) {
      gtag('event', eventName, eventParams);
    }
  };

  return (
    <AnalyticsContext.Provider value={{ trackEvent }}>
      {children}
    </AnalyticsContext.Provider>
  );
}