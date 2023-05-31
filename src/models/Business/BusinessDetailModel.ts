import {SnapshotOut, types} from 'mobx-state-tree';
import {AttributesModel} from './AttributesModel';
import {CoordinatesModel} from './CoordinatesModel';
import {HoursModel} from './HoursModel';
import {LocationModel} from '../Common';
import {MessagingModel} from './MessagingModel';
import {PhotoDetailsModel} from './PhotoDetailsModel';
import {SpecialHoursModel} from './SpecialHoursModel';
import {CategoryModel} from '../Category';

const BusinessDetailModel = types.model('BusinessDetailModel').props({
  alias: types.optional(types.string, ''),
  categories: types.array(CategoryModel),
  coordinates: types.optional(CoordinatesModel, {}),
  display_phone: types.optional(types.string, ''),
  distance: types.optional(types.number, 0),
  id: types.optional(types.string, ''),
  image_url: types.optional(types.string, ''),
  is_claimed: types.optional(types.boolean, false),
  is_closed: types.optional(types.boolean, false),
  date_opened: types.optional(types.string, ''),
  date_closed: types.optional(types.string, ''),
  location: types.optional(LocationModel, {}),
  name: types.optional(types.string, ''),
  phone: types.optional(types.string, ''),
  photos: types.array(types.optional(types.string, '')),
  photo_details: types.array(types.optional(PhotoDetailsModel, {})),
  photo_count: types.optional(types.number, 0),
  price: types.optional(types.string, ''),
  rating: types.optional(types.number, 0),
  review_count: types.optional(types.number, 0),
  hours: types.optional(HoursModel, {}),
  special_hours: types.array(types.optional(SpecialHoursModel, {})),
  transactions: types.array(types.string),
  url: types.optional(types.string, ''),
  attributes: types.optional(AttributesModel, {}),
  messaging: types.optional(MessagingModel, {}),
  yelp_menu_url: types.optional(types.string, ''),
});

export interface BusinessDetailInterface
  extends SnapshotOut<typeof BusinessDetailModel> {}

export {BusinessDetailModel};
