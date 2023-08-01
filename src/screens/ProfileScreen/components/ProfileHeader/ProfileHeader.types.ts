import {StyleProp, ViewStyle} from 'react-native';

export type ProfileHeaderProps = {
  image: string;
  name: string;
  email: string;
  imageOnPress: () => void;
  photoUploading: boolean;
  style?: StyleProp<ViewStyle>;
};
