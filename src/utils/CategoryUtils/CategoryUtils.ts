import {CustomIconNames} from '../../components';
import {Constants} from '../../constants';
import {CategoryInterface} from '../../models';
import {FeaturedCategories, MoreCategories} from './CategoryUtils.types';

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
    case FeaturedCategories.more:
      return Constants.MoreIconUrl;
    default:
      return Constants.DefaultIconUrl;
  }
};

const getCustomIconsForCategories = (categoryAlias: MoreCategories) => {
  switch (categoryAlias) {
    case MoreCategories.active:
      return CustomIconNames.Tennis;
    case MoreCategories.arts:
      return CustomIconNames.Events;
    case MoreCategories.auto:
      return CustomIconNames.Car;
    case MoreCategories.beautysvc:
      return CustomIconNames.Sparkles;
    case MoreCategories.education:
      return CustomIconNames.Education;
    case MoreCategories.eventservices:
      return CustomIconNames.Events;
    case MoreCategories.financialservices:
      return CustomIconNames.Finance;
    case MoreCategories.food:
      return CustomIconNames.FastFood;
    case MoreCategories.health:
      return CustomIconNames.Medkit;
    case MoreCategories.homeservices:
      return CustomIconNames.Hammer;
    case MoreCategories.hotelstravel:
      return CustomIconNames.Bus;
    case MoreCategories.localflavor:
      return CustomIconNames.Star;
    case MoreCategories.localservices:
      return CustomIconNames.Key;
    case MoreCategories.massmedia:
      return CustomIconNames.Tv;
    case MoreCategories.nightlife:
      return CustomIconNames.CoolDrink;
    case MoreCategories.pets:
      return CustomIconNames.Pets;
    case MoreCategories.professional:
      return CustomIconNames.Professional;
    case MoreCategories.publicservicesgovt:
      return CustomIconNames.Government;
    case MoreCategories.religiousorgs:
      return CustomIconNames.Religious;
    case MoreCategories.restaurants:
      return CustomIconNames.RestaurantPlate;
    case MoreCategories.shopping:
      return CustomIconNames.Bag;
    default:
      return CustomIconNames.Arts;
  }
};

export {featuredCategories, getIconForCategory, getCustomIconsForCategories};
