import { MapPin, Star, Users, Utensils } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Hotel } from "../types";

interface HotelCardProps {
  hotel: Hotel;
  onViewDetails: (hotel: Hotel) => void;
}

export const HotelCard = ({ hotel, onViewDetails }: HotelCardProps) => {
  const getLowestPrice = (hotel: Hotel) => {
    let lowestPrice = Infinity;
    hotel.rooms.forEach((room) => {
      room.roomTypes.pricings.forEach((pricing) => {
        if (pricing.price < lowestPrice) {
          lowestPrice = pricing.price;
        }
      });
    });
    return lowestPrice === Infinity ? null : lowestPrice;
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="relative h-48 overflow-hidden group">
        {hotel.propertyImages[0] && (
          <img
            src={hotel.propertyImages[0].images.url}
            alt={hotel.name}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
        )}
        {hotel._count.reviews > 0 && (
          <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-sm font-medium">
            {hotel._count.reviews} reviews
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl">{hotel.name}</CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="w-4 h-4" />
              {hotel.address.town}, {hotel.address.county}
            </CardDescription>
          </div>
          {hotel.propertyRatings && (
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{hotel.propertyRatings}</span>
            </div>
          )}
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {hotel.description}
        </p>

        <div className="space-y-3">
          {hotel.mealOptions.length > 0 && (
            <div className="flex items-center gap-2">
              <Utensils className="w-4 h-4 text-gray-500" />
              <span className="text-sm">
                {hotel.mealOptions
                  .map((option) => option.plan.replace(/_/g, " "))
                  .join(", ")}
              </span>
            </div>
          )}

          {hotel.rooms[0] && (
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-gray-500" />
              <span className="text-sm">{hotel.rooms[0].roomTypes.name}</span>
            </div>
          )}

          {getLowestPrice(hotel) && (
            <div className="flex justify-between items-center mt-4">
              <div className="text-lg font-semibold">
                From ${getLowestPrice(hotel)}
                <span className="text-sm font-normal text-gray-600">
                  {" "}
                  /night
                </span>
              </div>
              <button
                onClick={() => onViewDetails(hotel)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                View Details
              </button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
