import {observer} from 'mobx-react-lite';
import React from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet, View} from 'react-native';
import {FeaturedCategoryItem} from '../../../../components';
import {PrimaryStackParams, PrimaryStackRoute} from '../../../../navigation';
import {
  FeaturedCategories,
  horizontalScale,
  verticalScale,
} from '../../../../utils';
import {
  CategorySectionItem,
  CategorySectionProps,
} from './CategorySection.types';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

const CategorySection = observer((props: CategorySectionProps) => {
  const {categories} = props;
  const horizontalLine = () => {
    return <View style={styles.horizontalLine} />;
  };
  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryStackParams>>();

  const renderItem = (
    renderItemProps: ListRenderItemInfo<CategorySectionItem>,
  ) => {
    const {item, index} = renderItemProps;
    return (
      <FeaturedCategoryItem
        key={index}
        title={item.title}
        alias={item.alias as FeaturedCategories}
        style={styles.FeaturedCategoryItem}
        onPress={() =>
          navigation.navigate(PrimaryStackRoute.CategoryDetail, {
            title: item.title,
            alias: item.alias,
          })
        }
        iconStyle={styles.featuredCategoryIcon}
      />
    );
  };

  return (
    <FlatList
      data={categories}
      renderItem={renderItem}
      showsHorizontalScrollIndicator={false}
      numColumns={4}
      ListFooterComponent={categories.length ? horizontalLine : null}
    />
  );
});

const styles = StyleSheet.create({
  horizontalLine: {
    marginHorizontal: horizontalScale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  FeaturedCategoryItem: {
    marginVertical: verticalScale(10),
    marginHorizontal: horizontalScale(12),
  },
  featuredCategoryIcon: {
    marginBottom: verticalScale(4),
  },
});

export {CategorySection};
