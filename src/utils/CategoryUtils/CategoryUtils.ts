import {CustomIconNames} from '../../components';
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

  const featuredCategoryItems = categories.filter(category =>
    topFeaturedItems.includes(category.alias),
  );

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

const getCustomIconsForCategories = (categoryAlias: string) => {
  switch (categoryAlias) {
    case 'active':
      return CustomIconNames.Tennis;
    case 'arts':
      return CustomIconNames.Events;
    case 'auto':
      return CustomIconNames.Car;
    case 'beautysvc':
      return CustomIconNames.Sparkles;
    case 'education':
      return CustomIconNames.Education;
    case 'eventservices':
      return CustomIconNames.Events;
    case 'financialservices':
      return CustomIconNames.Finance;
    case 'food':
      return CustomIconNames.FastFood;
    case 'health':
      return CustomIconNames.Medkit;
    case 'homeservices':
      return CustomIconNames.Hammer;
    case 'hotelstravel':
      return CustomIconNames.Bus;
    case 'localflavor':
      return CustomIconNames.Star;
    case 'localservices':
      return CustomIconNames.Key;
    case 'massmedia':
      return CustomIconNames.Tv;
    case 'nightlife':
      return CustomIconNames.CoolDrink;
    case 'pets':
      return CustomIconNames.Pets;
    case 'professional':
      return CustomIconNames.Professional;
    case 'publicservicesgovt':
      return CustomIconNames.Government;
    case 'religiousorgs':
      return CustomIconNames.Religious;
    case 'restaurants':
      return CustomIconNames.RestaurantPlate;
    case 'shopping':
      return CustomIconNames.Bag;
    default:
      return CustomIconNames.Arts;
  }
};

export {featuredCategories, getIconForCategory, getCustomIconsForCategories};
