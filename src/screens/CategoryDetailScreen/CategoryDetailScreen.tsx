import React, {useContext} from 'react';
import {
  FlatList,
  ListRenderItemInfo,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {CategoryInterface, RootStoreContext} from '../../models';
import {CategoryDetailScreenProps} from './CategoryDetailScreen.types';
import {SettingsItem} from './components';
import {horizontalScale, verticalScale} from '../../utils';

const CategoryDetailScreen = (props: CategoryDetailScreenProps) => {
  const {route} = props;
  const {categories} = useContext(RootStoreContext);

  const renderItem = (
    renderItemProps: ListRenderItemInfo<CategoryInterface>,
  ) => {
    const {item, index} = renderItemProps;

    return (
      <SettingsItem
        key={index}
        title={item.title}
        alias={item.alias}
        style={styles.settingsItem}
        iconStyle={styles.categoryIcon}
      />
    );
  };

  const renderMainContent = () => {
    if (route.params.alias === 'more') {
      return (
        <FlatList
          data={categories.allCategories.filter(
            c => c.parent_aliases.length === 0,
          )}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentContainerStyle}
        />
      );
    }
    return (
      <View>
        <Text>Category Detail Screen</Text>
        <Text>{route.params.title}</Text>
      </View>
    );
  };

  return renderMainContent();
};

const styles = StyleSheet.create({
  settingsItem: {
    marginVertical: verticalScale(2),
    marginHorizontal: horizontalScale(6),
    paddingVertical: verticalScale(8),
  },
  categoryIcon: {
    marginRight: horizontalScale(10),
  },
  contentContainerStyle: {
    marginVertical: verticalScale(10),
  },
});

export {CategoryDetailScreen};
