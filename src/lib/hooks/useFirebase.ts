"use client";

import { useEffect, useState } from "react";
import { auth, db, storage, analytics, database } from "@/lib/firebase";
import {
  ref,
  onValue,
  set,
  query,
  orderByChild,
  limitToFirst,
} from "firebase/database";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export const useFirebase = () => {
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  return {
    auth,
    db,
    storage,
    analytics,
    database,
    isInitialized,
  };
};

export const useHeroImage = () => {
  const [heroImageUrl, setHeroImageUrl] = useState<string>(
    "/images/hero/hero.webp"
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const heroImagesRef = ref(database, "hero-images");
    const heroImageQuery = query(
      heroImagesRef,
      orderByChild("order"),
      limitToFirst(1)
    );

    const unsubscribe = onValue(heroImageQuery, (snapshot) => {
      try {
        const data = snapshot.val();
        if (data) {
          const firstImageKey = Object.keys(data)[0];
          const imageData = data[firstImageKey];

          if (imageData && imageData.url) {
            setHeroImageUrl(imageData.url);
          }
        }
        setLoading(false);
      } catch (err) {
        console.error("Failed to load hero image:", err);
        setError("Failed to load hero image");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const updateHeroImage = async (file: File) => {
    setLoading(true);
    setError(null);

    try {
      const timestamp = Date.now();

      const imageRef = storageRef(
        storage,
        `hero-images/hero-${timestamp}.webp`
      );
      await uploadBytes(imageRef, file);

      const downloadURL = await getDownloadURL(imageRef);

      const heroImageRef = ref(database, `hero-images/${timestamp}`);
      await set(heroImageRef, {
        id: timestamp.toString(),
        url: downloadURL,
        title: file.name.split(".")[0] || "hero",
        createdAt: new Date().toISOString(),
        order: 1,
      });

      setHeroImageUrl(downloadURL);
      setLoading(false);
    } catch (err) {
      console.error("Failed to update hero image:", err);
      setError("Failed to update hero image");
      setLoading(false);
      throw err;
    }
  };

  return {
    heroImageUrl,
    loading,
    error,
    updateHeroImage,
  };
};
