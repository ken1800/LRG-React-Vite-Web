export type MealPlan = 'ALL_INCLUSIVE' | 'FULL_BOARD' | 'HALF_BOARD' | 'BED_AND_BREAKFAST' | 'ROOM_ONLY';

export interface Address {
  country: string;
  county: string;
  town: string;
  street: string;
  city: string;
  latitude: number;
  longitude: number;
}

export interface Image {
  images: {
    url: string;
  };
}

export interface RoomPricing {
  id: number;
  price: number;
  pricingMode: string;
  occupants: number;
  mealOption: {
    plan: MealPlan;
    description: string | null;
  };
}

export interface RoomType {
  name: string;
  description: string;
  pricings: RoomPricing[];
  roomTypeImages: Image[];
}

export interface Hotel {
  id: number;
  name: string;
  description: string;
  address: Address;
  propertyImages: Image[];
  staffImages: Image[];
  foodImages: Image[];
  mealOptions: Array<{ plan: MealPlan; description: string | null }>;
  rooms: Array<{ roomTypes: RoomType }>;
  _count: {
    reviews: number;
  };
  propertyRatings: null | number;
}

export interface ApiResponse {
  status: boolean;
  message: string;
  data: Hotel[];
}

export interface HotelDetails {
    propertyAmenities: Array<{
      amenities: {
        name: string;
        description?: string;
        category?: string;
      };
    }>;
    propertyLanguages: Array<{
      language: {
        name: string;
        code: string;
      };
    }>;
    rooms: Array<{
      id: number;
      roomTypes: {
        id: number;
        name: string;
        description: string;
        roomTypeImages: Array<{
          images: {
            url: string;
            title?: string;
          };
        }>;
        pricings: Array<{
          id: number;
          price: number;
          currency: string;
          mealOption: {
            plan: string;
            description?: string;
          };
        }>;
        bathroom?: {
          bathroomAmenties: Array<{
            amenities: {
              name: string;
              description?: string;
            };
          }>;
        };
      };
    }>;
  }
  