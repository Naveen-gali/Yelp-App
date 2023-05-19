import React, {useContext} from 'react';
import {Text, View} from 'react-native';
import {RootStoreContext} from '../../models';
import {CategoryDetailScreenProps} from './CategoryDetailScreen.types';

const CategoryDetailScreen = (props: CategoryDetailScreenProps) => {
  const {route} = props;
  const {categories} = useContext(RootStoreContext);

  const renderMainContent = () => {
    if (route.params.alias === 'more') {
      return (
        <View>
          {categories.featuredCategories.map(c => (
            <Text key={c.alias}>{c.title}</Text>
          ))}
        </View>
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

export {CategoryDetailScreen};
