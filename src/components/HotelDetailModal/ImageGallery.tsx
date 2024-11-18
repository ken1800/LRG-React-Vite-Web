interface ImageGalleryProps {
  images: Array<{ images: { url: string } }>;
  alt: string;
}

export const ImageGallery = ({ images, alt }: ImageGalleryProps) => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
    {images.slice(0, 6).map((image, index) => (
      <img
        key={index}
        src={image.images.url}
        alt={`${alt} view ${index + 1}`}
        className="w-full h-48 object-cover rounded-lg"
      />
    ))}
  </div>
);
