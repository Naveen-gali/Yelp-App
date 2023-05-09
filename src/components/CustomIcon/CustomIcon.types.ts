import type {IconProps} from 'react-native-vector-icons/Icon';

export type CustomIconType = Omit<IconProps, 'name'> & {
  name: CustomIconNames;
};

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
  Profile = 'person-circle-outline',
  Image = 'image',
  Star = 'star',
  Camera = 'camera',
  Check = 'checkmark-circle-sharp',
  Business = 'business-sharp',
  Heart = 'heart',
  Messages = 'mail-sharp',
  Calendar = 'calendar',
  Pulse = 'pulse',
}
