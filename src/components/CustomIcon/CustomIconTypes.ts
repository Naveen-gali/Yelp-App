import type {IconProps} from 'react-native-vector-icons/Icon';

export type CustomIconType = Omit<IconProps, 'name'> & {
  name: CustomIconNames;
};

export enum CustomIconNames {
  Delivery = 'delivery',
  RestaurantPlate = 'restaurant-plate',
  AmazonPay = 'amazonpay',
}
