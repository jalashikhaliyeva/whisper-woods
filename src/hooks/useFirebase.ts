'use client';

import { useEffect, useState } from 'react';
import { auth, db, storage, analytics, database } from '@/lib/firebase';
import { ref, onValue, set } from 'firebase/database';
import { ref as storageRef, uploadBytes, getDownloadURL } from 'firebase/storage';

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
    database,
    isInitialized
  };
};

// Hook for managing hero background image
export const useHeroImage = () => {
  const [heroImageUrl, setHeroImageUrl] = useState<string>('/images/hero/hero.webp');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const heroImageRef = ref(database, 'hero/backgroundImage');
    
    const unsubscribe = onValue(heroImageRef, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data && data.url) {
          setHeroImageUrl(data.url);
        }
        setLoading(false);
      } catch (err) {
        setError('Failed to load hero image');
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateHeroImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      // Upload to Firebase Storage
      const imageRef = storageRef(storage, `hero/background-${Date.now()}.${file.name.split('.').pop()}`);
      await uploadBytes(imageRef, file);
      
      // Get download URL
      const downloadURL = await getDownloadURL(imageRef);
      
      // Update Realtime Database
      const heroImageRef = ref(database, 'hero/backgroundImage');
      await set(heroImageRef, {
        url: downloadURL,
        updatedAt: new Date().toISOString(),
        filename: file.name
      });

      setHeroImageUrl(downloadURL);
      setLoading(false);
    } catch (err) {
      setError('Failed to update hero image');
      setLoading(false);
      throw err;
    }
  };

  return {
    heroImageUrl,
    loading,
    error,
    updateHeroImage
  };
};