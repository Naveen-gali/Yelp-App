import type {IconProps} from 'react-native-vector-icons/Icon';

export type CustomIconType = Omit<IconProps, 'name'> & {
  name: CustomIconNames;
};

// Find the icons here -> https://codepen.io/pen?&prefill_data_id=ec8133fc-a6a7-4fc3-9532-674673161f74

export enum CustomIconNames {
  // TODO: Add the icon names as needed
  Delivery = 'delivery',
  RestaurantPlate = 'restaurant-plate',
  AmazonPay = 'amazonpay',
  Religious = 'religious',
  Events = 'events',
  Finance = 'financial_services',
  Professional = 'professional_services',
  Arts = 'arts_and_entertainment',
  Government = 'government',
  Education = 'education',
  Pets = 'pets',
  Search = 'search',
}
