import {GestureResponderEvent} from 'react-native';

export type EventItemProps = {
  name: string;
  onPress: (event: GestureResponderEvent) => void;
  imageUrl?: string;
};
