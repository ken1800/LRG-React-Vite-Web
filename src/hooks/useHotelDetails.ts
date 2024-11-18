import { useState, useEffect, useCallback } from "react";
import { Hotel } from "../types";
import { HotelDetails } from "../types";
import { API_CONFIG } from "../config";

interface UseHotelDetailsReturn {
  selectedHotel: Hotel | null;
  selectedHotelDetails: HotelDetails | null;
  loadingDetails: boolean;
  error: string | null;
  setSelectedHotel: (hotel: Hotel | null) => void;
  refetchDetails: (propertyId: number) => Promise<void>;
}

export const useHotelDetails = (): UseHotelDetailsReturn => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [selectedHotelDetails, setSelectedHotelDetails] =
    useState<HotelDetails | null>(null);
  const [loadingDetails, setLoadingDetails] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPropertyDetails = useCallback(async (propertyId: number) => {
    setLoadingDetails(true);
    setError(null);

    try {
      const response = await fetch(`${API_CONFIG.PROPERTY_URL}/${propertyId}`, {
        headers: new Headers({
          "x-app-id": API_CONFIG.APP_ID || "",
          "Content-Type": "application/json",
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.status) {
        setSelectedHotelDetails(data.data);
      } else {
        throw new Error(data.message || "Failed to fetch property details");
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An error occurred while fetching property details";
      setError(errorMessage);
      console.error("Error fetching property details:", err);
    } finally {
      setLoadingDetails(false);
    }
  }, []);

  const refetchDetails = useCallback(
    async (propertyId: number) => {
      await fetchPropertyDetails(propertyId);
    },
    [fetchPropertyDetails]
  );

  useEffect(() => {
    if (selectedHotel) {
      fetchPropertyDetails(selectedHotel.id);
    } else {
      setSelectedHotelDetails(null);
      setError(null);
    }
  }, [selectedHotel, fetchPropertyDetails]);

  return {
    selectedHotel,
    selectedHotelDetails,
    loadingDetails,
    error,
    setSelectedHotel,
    refetchDetails,
  };
};
