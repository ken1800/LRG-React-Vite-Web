import { Alert, AlertDescription } from "@/components/ui/alert";
import { useHotels } from "../hooks/useHotels";
import { useHotelDetails } from "../hooks/useHotelDetails";
import { HotelCard } from "./HotelCard";
import { LoadingSpinner } from "./LoadingSpinner";
import { HotelDetailModal } from "./HotelDetailModal";
import { useSearch } from '../context/SearchContext';
import { useEffect } from "react";
import { Hotel } from "../types";

const HotelsList = () => {
  const { hotels, loading, error } = useHotels();
  const { setAllHotels, filteredHotels } = useSearch();
  const {
    selectedHotel,
    selectedHotelDetails,
    loadingDetails,
    setSelectedHotel,
  } = useHotelDetails();

  useEffect(() => {
    if (hotels.length > 0) {
      setAllHotels(hotels);
    }
  }, [hotels, setAllHotels]);

  const handleViewDetails = (hotel: Hotel) => {
    setSelectedHotel(hotel);
  };

  const handleCloseModal = () => {
    setSelectedHotel(null);
  };

  if (loading) return <LoadingSpinner />;
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Available Properties</h1>
        <p className="text-gray-600">Found {filteredHotels.length} properties</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHotels.map((hotel) => (
          <HotelCard
            key={hotel.id}
            hotel={hotel}
            onViewDetails={handleViewDetails}
          />
        ))}
      </div>

      {selectedHotel && (
        <HotelDetailModal
          hotel={selectedHotelDetails}
          onClose={handleCloseModal}
          loading={loadingDetails}
        />
      )}
    </div>
  );
};

export default HotelsList;