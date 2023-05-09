import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {FeaturedCategoriesData} from '../../../../assets/data';
import {CategoryItem} from '../../../../components';
import {horizontalScale} from '../../../../utils';
import {CategorySectionItem} from './CategorySection.types';

const CategorySection = () => {
  const horizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const renderItem = (props: ListRenderItemInfo<CategorySectionItem>) => {
    const {item, index} = props;
    return <CategoryItem key={index} icon={item.logo} title={item.title} />;
  };

  return (
    <FlatList
      data={FeaturedCategoriesData}
      renderItem={renderItem}
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
