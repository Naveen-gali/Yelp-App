import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {CategoryItem} from '../../../../components';
import {horizontalScale, verticalScale} from '../../../../utils';
import {
  CategorySectionItem,
  CategorySectionProps,
} from './CategorySection.types';

const CategorySection = (props: CategorySectionProps) => {
  const {categories} = props;
  const horizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };

  const renderItem = (
    renderItemProps: ListRenderItemInfo<CategorySectionItem>,
  ) => {
    const {item, index} = renderItemProps;
    return (
      <CategoryItem
        key={index}
        title={item.title}
        alias={item.alias}
        style={styles.categoryItemIcon}
      />
    );
  };

  return (
    <FlatList
      data={categories}
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
  categoryItemIcon: {
    marginVertical: verticalScale(20),
    marginHorizontal: horizontalScale(14),
  },
});

export {CategorySection};
