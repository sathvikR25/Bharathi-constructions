import { useState, useEffect } from 'react';

export function useABTest(experimentId = 'hero_cta_test') {
  const [variant, setVariant] = useState(null);

  useEffect(() => {
    let assignedVariant = localStorage.getItem(`ab_${experimentId}`);
    
    if (!assignedVariant) {
      assignedVariant = Math.random() < 0.5 ? 'A' : 'B';
      localStorage.setItem(`ab_${experimentId}`, assignedVariant);
    }
    
    setVariant(assignedVariant);
  }, [experimentId]);

  return variant;
}