import React from 'react';
import {Text, View} from 'react-native';
import {CategoryBusinessesScreenProps} from './CategoryBusinessesScreen.types';
import {useThemeColor} from '../../hooks';
import {fontStyles} from '../../constants';

const CategoryBusinessesScreen = (props: CategoryBusinessesScreenProps) => {
  const {route} = props;
  const {category} = route.params;
  const {colors} = useThemeColor();

  return (
    <View>
      <Text style={[fontStyles.b2_Text_Regular, {color: colors.text}]}>
        {category.title}
      </Text>
    </View>
  );
};

export {CategoryBusinessesScreen};
