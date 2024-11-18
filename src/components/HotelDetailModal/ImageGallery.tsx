import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageModalProps {
  images: Array<{ images: { url: string } }>;
  alt: string;
  initialIndex?: number;
}

const ImageModal = ({ images, alt, initialIndex = 0 }: ImageModalProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const previousImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <div className="relative h-[80vh]">
        <img
          src={images[currentIndex].images.url}
          alt={`${alt} view ${currentIndex + 1}`}
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
      
      <div className="absolute bottom-4 left-0 right-0">
        <div className="flex justify-center gap-2 px-4 overflow-x-auto max-w-full">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`relative flex-shrink-0 w-16 h-16 rounded-md overflow-hidden transition-opacity ${
                index === currentIndex ? "ring-2 ring-white" : "opacity-70"
              }`}
            >
              <img
                src={image.images.url}
                alt={`${alt} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

interface ImageGalleryProps {
  images: Array<{ images: { url: string } }>;
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => {

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {images.slice(0, 6).map((image, index) => (
        <Dialog key={index}>
          <DialogTrigger asChild>
            <button className="group relative w-full h-48 rounded-lg overflow-hidden">
              <img
                src={image.images.url}
                alt={`${alt} view ${index + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] h-[90vh] p-0">
            <ImageModal 
              images={images} 
              alt={alt} 
              initialIndex={index}
            />
          </DialogContent>
        </Dialog>
      ))}
      
      {images.length > 6 && (
        <Dialog>
          <DialogTrigger asChild>
            <button className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100">
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white font-medium">
                +{images.length - 6} more
              </div>
              <img
                src={images[5].images.url}
                alt={`${alt} view 6`}
                className="w-full h-full object-cover opacity-60"
              />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-[95vw] h-[90vh] p-0">
            <ImageModal 
              images={images} 
              alt={alt} 
              initialIndex={5}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};