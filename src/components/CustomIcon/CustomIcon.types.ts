import type {IconProps} from 'react-native-vector-icons/Icon';

export type CustomIconType = Omit<IconProps, 'name'> & {
  name: CustomIconNames;
};

export enum CustomIconNames {
  // TODO: Add the icon names as needed
  delivery = 'delivery',
  restaurants = 'restaurant-plate',
  AmazonPay = 'amazonpay',
  religiousorgs = 'religious',
  eventservices = 'events',
  financialservices = 'financial_services',
  professional = 'professional_services',
  arts = 'arts_and_entertainment',
  publicservicesgovt = 'government',
  education = 'education',
  pets = 'pets',
  Search = 'search',
  Profile = 'person-circle-outline',
  Image = 'image',
  Star = 'star',
  Camera = 'camera',
  CheckMark = 'checkmark-circle-sharp',
  Business = 'business-sharp',
  Heart = 'heart',
  Messages = 'mail-sharp',
  Calendar = 'calendar',
  Pulse = 'pulse',
  ArrowForward = 'arrow-forward-circle',
  active = 'tennisball',
  auto = 'car',
  beautysvc = 'sparkles',
  food = 'fast-food',
  health = 'medkit',
  hotelstravel = 'bus',
  localflavor = 'star',
  localservices = 'key',
  massmedia = 'tv-sharp',
  nightlife = 'cool-drink-glass',
  shopping = 'bag-handle',
  homeservices = 'hammer',
}
