import { Wifi, Car, Puzzle, Coffee, Tv } from "lucide-react";

interface AmenitiesSectionProps {
  amenities: Array<{ amenities: { name: string } }>;
}

export const AmenitiesSection = ({ amenities }: AmenitiesSectionProps) => {
  const getAmenityIcon = (name: string) => {
    switch (name.toLowerCase()) {
      case "wifi":
      case "free wifi":
        return <Wifi className="w-5 h-5" />;
      case "parking":
        return <Car className="w-5 h-5" />;
      case "swimming pool":
        return <Puzzle className="w-5 h-5" />;
      case "coffee / tea maker":
        return <Coffee className="w-5 h-5" />;
      case "streaming services (e.g netflix)":
        return <Tv className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <div className="mb-6">
      <h3 className="text-lg font-semibold mb-2">Amenities</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {amenities.map((amenity, index) => (
          <div key={index} className="flex items-center gap-2">
            {getAmenityIcon(amenity.amenities.name)}
            <span className="text-sm">{amenity.amenities.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
