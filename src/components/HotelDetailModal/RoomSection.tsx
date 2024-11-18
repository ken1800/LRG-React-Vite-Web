interface RoomSectionProps {
  room: any;
}

export const RoomSection = ({ room }: RoomSectionProps) => (
  <div className="border rounded-lg p-4">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h4 className="font-medium text-lg">{room.roomTypes.name}</h4>
        <p className="text-sm text-gray-600">{room.roomTypes.description}</p>
      </div>
    </div>

    <div className="grid grid-cols-4 gap-2 mb-4">
      {room.roomTypes.roomTypeImages
        .slice(0, 4)
        .map((image: any, idx: number) => (
          <img
            key={idx}
            src={image.images.url}
            alt={`Room view ${idx + 1}`}
            className="w-full h-20 object-cover rounded"
          />
        ))}
    </div>

    {room.roomTypes.bathroom?.bathroomAmenties?.length > 0 && (
      <div className="mb-4">
        <h5 className="font-medium mb-2">Bathroom Amenities</h5>
        <div className="flex flex-wrap gap-2">
          {room.roomTypes.bathroom.bathroomAmenties.map(
            (amenity: any, idx: number) => (
              <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                {amenity.amenities.name}
              </span>
            )
          )}
        </div>
      </div>
    )}

    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b">
            <th className="text-left py-2">Meal Plan</th>
            <th className="text-right py-2">Price per night</th>
          </tr>
        </thead>
        <tbody>
          {room.roomTypes.pricings.map((pricing: any, idx: number) => (
            <tr key={idx} className="border-b last:border-b-0">
              <td className="py-2">
                {pricing.mealOption.plan.replace(/_/g, " ")}
              </td>
              <td className="text-right py-2 font-medium">${pricing.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);
