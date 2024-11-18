import { useState, useEffect } from 'react';
import { Hotel, ApiResponse } from '../types';
import { API_CONFIG } from '../config';

export const useHotels = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const response = await fetch(API_CONFIG.PROPERTIES, {
        headers: new Headers({
          "x-app-id": API_CONFIG.APP_ID || "",
          "Content-Type": "application/json",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ApiResponse = await response.json();
      
      if (data.status) {
        setHotels(data.data);
      } else {
        setError(data.message || 'Failed to fetch hotel data');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred while fetching data');
    } finally {
      setLoading(false);
    }
  };

  return { hotels, loading, error };
};
