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
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}
