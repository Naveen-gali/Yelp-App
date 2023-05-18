import {Constants} from '../../constants';
import {CategoryInterface} from '../../models';
import {FeaturedCategories} from './CategoryUtils.types';

const featuredCategories = (categories: CategoryInterface[]) => {
  const topFeaturedItems = [
    'restaurants',
    'shopping',
    'nightlife',
    'active',
    'beautysvc',
    'homeservices',
  ];

  const moreItemArray = [
    {
      alias: 'more',
      title: 'More',
      parent_aliases: [],
      country_blacklist: [],
      country_whitelist: [],
    },
  ];

  const featuredCategoryItems = categories
    .filter(category => category.parent_aliases.length === 0)
    .filter(category => topFeaturedItems.includes(category.alias));

  const extraCategoryItems = categories
    .filter(category => category.parent_aliases.length === 0)
    .filter(category => !featuredCategoryItems.includes(category))
    .slice(0, 7 - featuredCategoryItems.length);

  const featuredCategoriesData = featuredCategoryItems.concat(
    extraCategoryItems,
    moreItemArray,
  );

  return featuredCategoriesData;
};

const getIconForCategory = (categoryAlias: keyof typeof FeaturedCategories) => {
  switch (categoryAlias) {
    case FeaturedCategories.restaurants:
      return Constants.RestaurantsIconUrl;
    case FeaturedCategories.shopping:
      return Constants.ShoppingIconUrl;
    case FeaturedCategories.nightlife:
      return Constants.NightLifeIconUrl;
    case FeaturedCategories.active:
      return Constants.ActiveIconUrl;
    case FeaturedCategories.beautysvc:
      return Constants.BeautyIconUrl;
    case FeaturedCategories.homeservices:
      return Constants.HomeServicesIconUrl;
    case FeaturedCategories.more:
      return Constants.MoreIconUrl;
    default:
      return Constants.DefaultIconUrl;
  }
};

export {featuredCategories, getIconForCategory};
