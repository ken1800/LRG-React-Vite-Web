import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MapPin, Star, Users, Utensils, ChevronLeft, ChevronRight } from "lucide-react";
import { Hotel } from "../types";

interface ImageModalProps {
  images: Array<{ images: { url: string } }>;
  initialIndex?: number;
}

const ImageModal = ({ images, initialIndex = 0 }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[80vh]">
        <img
          src={images[currentIndex].images.url}
          alt={`Image ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />
        
        {images.length > 1 && (
          <>
            <button
              onClick={previousImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 p-2 rounded-full text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>
      
      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

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
          <Dialog>
            <DialogTrigger asChild>
              <button className="w-full h-full">
                <img
                  src={hotel.propertyImages[0].images.url}
                  alt={hotel.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] h-[90vh] p-0">
              <ImageModal images={hotel.propertyImages} />
            </DialogContent>
          </Dialog>
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