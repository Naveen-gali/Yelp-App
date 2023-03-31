import type {IconProps} from 'react-native-vector-icons/Icon';

export type CustomIconType = Omit<IconProps, 'name'> & {
  name: CustomIconNames;
};

export enum CustomIconNames {
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
}
