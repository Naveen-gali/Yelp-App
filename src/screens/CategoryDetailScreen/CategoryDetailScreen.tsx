import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import React, {useCallback, useContext} from 'react';
import {FlatList, ListRenderItemInfo, StyleSheet} from 'react-native';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {CategoryInterface, RootStoreContext} from '../../models';
import {PrimaryStackParams, PrimaryStackRoute} from '../../navigation';
import {
  DeviceUtils,
  FeaturedCategories,
  horizontalScale,
  verticalScale,
} from '../../utils';
import {CategoryDetailScreenProps} from './CategoryDetailScreen.types';
import {CategoryItem} from './components';

const CategoryDetailScreen = (props: CategoryDetailScreenProps) => {
  const {alias} = props.route.params;
  const {categories} = useContext(RootStoreContext);
  const {colors} = useThemeColor();
  const navigation =
    useNavigation<NativeStackNavigationProp<PrimaryStackParams>>();

  const checkSubCategories = useCallback(
    (categoryAlias: string) => {
      return (
        categories.allCategories.filter(category =>
          category.parent_aliases.includes(categoryAlias),
        ).length !== 0
      );
    },
    [categories.allCategories],
  );

  const getData = useCallback(() => {
    if (alias === FeaturedCategories.more) {
      return categories.allCategories.filter(
        c => c.parent_aliases.length === 0,
      );
    }
    return categories.allCategories.filter(category =>
      category.parent_aliases.includes(alias),
    );
  }, [alias, categories.allCategories]);

  const renderItem = useCallback(
    (
      renderItemProps: ListRenderItemInfo<CategoryInterface>,
      showIcon: boolean,
    ) => {
      const {item, index} = renderItemProps;

      const onPressHandler = () => {
        return checkSubCategories(item.alias)
          ? navigation.push(PrimaryStackRoute.CategoryDetail, {
              title: item.title,
              alias: item.alias,
            })
          : navigation.push(PrimaryStackRoute.CategoryBusinesses, {
              category: item,
            });
      };

      return (
        <CategoryItem
          key={index}
          title={item.title}
          alias={item.alias}
          style={styles.categoryItem}
          iconStyle={[styles.categoryIcon, {color: colors.text}]}
          arrowStyle={{color: colors.text}}
          labelStyle={[
            DeviceUtils.isAndroid
              ? fontStyles.b1_Text_Regular
              : fontStyles.b2_Text_Regular,
            {color: colors.text},
          ]}
          onPress={onPressHandler}
          showIcon={showIcon}
          showArrow={checkSubCategories(item.alias)}
        />
      );
    },
    [checkSubCategories, colors.text, navigation],
  );

  const renderMainContent = useCallback(() => {
    if (alias === FeaturedCategories.more) {
      return (
        <FlatList
          data={getData()}
          renderItem={e => renderItem(e, true)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      );
    } else {
      return (
        <FlatList
          data={getData()}
          renderItem={e => renderItem(e, false)}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      );
    }
  }, [alias, getData, renderItem]);

  return renderMainContent();
};

const styles = StyleSheet.create({
  categoryItem: {
    marginVertical: verticalScale(2),
    marginHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(8),
  },
  categoryIcon: {
    marginRight: horizontalScale(10),
  },
  contentContainerStyle: {
    paddingBottom: verticalScale(20),
  },
});

export {CategoryDetailScreen};
