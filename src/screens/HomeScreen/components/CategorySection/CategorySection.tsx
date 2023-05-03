import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {FeaturedCategoriesData} from '../../../../assets/data';
import {CategoryItem} from '../../../../components';
import {horizontalScale} from '../../../../utils';

const CategorySection = () => {
  const horizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };
  return (
    <FlatList
      data={FeaturedCategoriesData}
      renderItem={({item, index}) => (
        <CategoryItem key={index} icon={item.logo} title={item.name} />
      )}
      showsHorizontalScrollIndicator={false}
      numColumns={4}
      ListFooterComponent={horizontalLine}
    />
  );
};

const styles = StyleSheet.create({
  horizontalLine: {
    marginHorizontal: horizontalScale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export {CategorySection};
