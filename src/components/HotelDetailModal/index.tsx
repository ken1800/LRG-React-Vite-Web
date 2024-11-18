import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ImageGallery } from "./ImageGallery";
import { Languages, MapPin } from "lucide-react";
import { AmenitiesSection } from "./AmenitiesSection";
import { RoomSection } from "./RoomSection";

interface HotelDetailModalProps {
  hotel: any;
  onClose: () => void;
  loading: boolean;
}

export const HotelDetailModal = ({
  hotel,
  onClose,
  loading,
}: HotelDetailModalProps) => {
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8">
          <LoadingSpinner />
        </div>
      </div>
    );
  }

  if (!hotel) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
        <div className="bg-white rounded-lg p-8 text-center text-gray-500">
          Failed to load property details
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">{hotel.name}</h2>
              <p className="text-gray-600 flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                {hotel.address.street}, {hotel.address.town}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-2"
            >
              ✕
            </button>
          </div>

          <ImageGallery images={hotel.propertyImages} alt={hotel.name} />

          {hotel.propertyLanguages?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                <Languages className="w-5 h-5" />
                Languages Spoken
              </h3>
              <div className="flex gap-2 flex-wrap">
                {hotel.propertyLanguages.map((lang: any, index: number) => (
                  <span key={index} className="bg-gray-100 px-3 py-1 rounded">
                    {lang.language.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {hotel.propertyAmenities?.length > 0 && (
            <AmenitiesSection amenities={hotel.propertyAmenities} />
          )}

          <div>
            <h3 className="text-lg font-semibold mb-4">Available Rooms</h3>
            <div className="space-y-4">
              {hotel.rooms.map((room: any, index: number) => (
                <RoomSection key={index} room={room} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
