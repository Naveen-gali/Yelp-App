import {observer} from 'mobx-react-lite';
import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {CategoryItem} from '../../../../components';
import {PrimaryStackRoute} from '../../../../navigation';
import {horizontalScale, verticalScale} from '../../../../utils';
import {
  CategorySectionItem,
  CategorySectionProps,
} from './CategorySection.types';

const CategorySection = observer((props: CategorySectionProps) => {
  const {categories, navigation} = props;
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
        onPress={() =>
          navigation.navigate(PrimaryStackRoute.CategoryDetail, {
            title: item.title,
            alias: item.alias,
          })
        }
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
});

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
