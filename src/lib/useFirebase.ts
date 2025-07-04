'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage, analytics } from './firebase';

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Firebase is initialized when the component mounts
    setIsInitialized(true);
  }, []);

  return {
    auth,
    db,
    storage,
    analytics,
    isInitialized
  };
}; 