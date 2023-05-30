import {Constants} from '../../constants';
import {Strings} from '../../i18n';
import {CategoryInterface} from '../../models';
import {FeaturedCategories} from './CategoryUtils.types';

const FEATURED_CATEGORIES_GRID_LENGTH = 7;

const featuredCategories = (categories: CategoryInterface[]) => {
  const topFeaturedItems = [
    'restaurants',
    'shopping',
    'nightlife',
    'active',
    'beautysvc',
    'homeservices',
    'auto',
  ];

  const moreItemArray = [
    {
      alias: 'more',
      title: Strings.categories.More,
      parent_aliases: [],
      country_blacklist: [],
      country_whitelist: [],
    },
  ];

  const featuredCategoryItems = categories.filter(category =>
    topFeaturedItems.includes(category.alias),
  );

  const extraCategoryItems = categories
    .filter(category => category.parent_aliases.length === 0)
    .filter(category => !featuredCategoryItems.includes(category))
    .slice(0, FEATURED_CATEGORIES_GRID_LENGTH - featuredCategoryItems.length);

  const featuredCategoriesData = featuredCategoryItems.concat(
    extraCategoryItems,
    moreItemArray,
  );

  return featuredCategoriesData;
};

const getIconForCategory = (categoryAlias: FeaturedCategories) => {
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
    case FeaturedCategories.auto:
      return Constants.AutomotiveIconUrl;
    case FeaturedCategories.more:
      return Constants.MoreIconUrl;
    default:
      return Constants.DefaultIconUrl;
  }
};

export {featuredCategories, getIconForCategory};
