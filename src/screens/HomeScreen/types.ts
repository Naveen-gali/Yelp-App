export interface Root {
  businesses: Business[];
  region: Region;
  total: number;
}

export interface Business {
  alias: string;
  categories: Category[];
  coordinates: Coordinates;
  display_phone: string;
  distance: number;
  id: string;
  image_url: string;
  is_closed: boolean;
  location: Location;
  name: string;
  phone: string;
  price: string;
  rating: number;
  review_count: number;
  transactions: string[];
  url: string;
}

export interface Category {
  alias: string;
  title: string;
}

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Location {
  address1: string;
  address2: string;
  address3: string;
  city: string;
  country: string;
  display_address: string[];
  state: string;
  zip_code: string;
}

export interface Region {
  center: Center;
}

export interface Center {
  latitude: number;
  longitude: number;
}

export type BusinessSuccessType = {
  businesses: Business[];
};
export type ErrorType = {
  error: {
    code: string;
    description: string;
  };
  show_error_screen: true;
};

export enum SortByEnum {
  Best_Match = 'best_match',
  Rating = 'rating',
  Review_Count = 'review_count',
  Distance = 'distance',
}
