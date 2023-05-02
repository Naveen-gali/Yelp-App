import React from 'react';
import {FlatList} from 'react-native';
import {FeaturedCategoriesData} from '../../../../assets/data';
import {CategoryItem} from '../../../../components';

const CategorySection = () => {
  return (
    <FlatList
      data={FeaturedCategoriesData}
      renderItem={({item, index}) => (
        <CategoryItem key={index} icon={item.logo} title={item.name} />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

export {CategorySection};
