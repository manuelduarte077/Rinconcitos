interface Geometry {
  location: {
    lat: number;
    lng: number;
  };
}

export interface Place {
  place_id: string;
  name: string;
  formatted_address: string;
  business_status: string;
  rating: number;
  user_ratings_total: number;
  utc_offset_minutes: number;
  types: string[];
  icon: string;
  geometry: Geometry;
  photos?: {
    photo_reference: string;
    height: number;
    width: number;
  }[];
  opening_hours?: {
    open_now: boolean;
  };
  price_level?: number;
  vicinity: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
