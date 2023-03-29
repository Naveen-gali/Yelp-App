import {SnapshotOut, types} from 'mobx-state-tree';
import {AttributesModel} from './AttributesModel';
import {CategoryModel} from './CategoryModel';
import {CoordinatesModel} from './CoordinatesModel';
import {HoursModel} from './HoursModel';
import {LocationModel} from './LocationModel';
import {MessagingModel} from './MessagingModel';
import {PhotoDetailsModel} from './PhotoDetailsModel';
import {SpecialHoursModel} from './SpecialHoursModel';

const BusinessDetailModel = types.model('BusinessDetailModel').props({
  alias: '',
  categories: types.array(CategoryModel),
  coordinates: types.optional(CoordinatesModel, {}),
  display_phone: '',
  distance: 0,
  id: '',
  image_url: '',
  is_claimed: false,
  is_closed: false,
  date_opened: '',
  date_closed: '',
  location: types.optional(LocationModel, {}),
  name: '',
  phone: '',
  photos: types.array(types.string),
  photo_details: types.array(types.optional(PhotoDetailsModel, {})),
  photo_count: 0,
  price: '',
  rating: 0,
  review_count: 0,
  hours: types.optional(HoursModel, {}),
  special_hours: types.array(types.optional(SpecialHoursModel, {})),
  transactions: types.array(types.string),
  url: '',
  attributes: types.optional(AttributesModel, {}),
  messaging: types.optional(MessagingModel, {}),
  yelp_menu_url: '',
});

export interface BusinessDetailInterface
  extends SnapshotOut<typeof BusinessDetailModel> {}

export {BusinessDetailModel};
