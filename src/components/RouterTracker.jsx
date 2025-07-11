// src/components/RouterTracker.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useAnalytics } from '../contexts/AnalyticsContext';

export function RouterTracker() {
  const location = useLocation();
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    trackEvent('page_view', {
      page_path: location.pathname,
      page_title: document.title,
      page_location: window.location.href
    });
  }, [location, trackEvent]);

  return null;
}