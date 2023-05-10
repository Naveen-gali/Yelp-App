import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {CategoryDetailScreenProps} from './CategoryDetailScreen.types';
import {PopularCategoriesData} from '../../assets';
import {LocaleUtils, horizontalScale, verticalScale} from '../../utils';
import {CustomIcon} from '../../components';
import {fontStyles} from '../../constants';

export const CategoryDetailScreen = ({route}: CategoryDetailScreenProps) => {
  const {alias} = route.params;

  const horizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const renderContent = () => {
    if (alias === 'more') {
      return (
        <FlatList
          data={PopularCategoriesData}
          renderItem={({item, index}) => (
            <View key={index} style={styles.categoryItemContainer}>
              <CustomIcon name={item.icon} size={30} style={styles.icon} />
              <Text style={fontStyles.b2_Text_Regular}>
                {LocaleUtils.localizedText(item.title)}
              </Text>
            </View>
          )}
          ItemSeparatorComponent={horizontalLine}
          contentContainerStyle={styles.container}
        />
      );
    } else {
      return (
        <View>
          <Text>{alias}</Text>
        </View>
      );
    }
  };

  return renderContent();
};
const styles = StyleSheet.create({
  categoryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: verticalScale(5),
  },
  horizontalLine: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  container: {
    marginHorizontal: horizontalScale(10),
  },
  icon: {
    marginRight: horizontalScale(10),
  },
});
