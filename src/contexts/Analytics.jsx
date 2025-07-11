import { useEffect } from 'react';
import { GA4React } from 'ga-4-react';


const Analytics = () => {
  const ga4react = new GA4React(
    'G-ETBCQTNR8D'
  );
  
  useEffect(() => {
    ga4react.initialize().catch(err => console.error(err));
  }, []);

  return null;
};

export default Analytics;