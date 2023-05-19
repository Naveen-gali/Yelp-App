import {GestureResponderEvent} from 'react-native';

export type SearchCarouselItemProps = {
  name: string;
  buttonText: string;
  image: string;
  category?: string;
  onPress: (event: GestureResponderEvent) => void;
};
