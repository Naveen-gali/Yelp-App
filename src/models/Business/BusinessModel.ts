import {SnapshotOut, types} from 'mobx-state-tree';
import {CategoryModel} from '../Category';
import {LocationModel} from '../Common';
import {CoordinatesModel} from './CoordinatesModel';

const BusinessModel = types.model('BusinessModel').props({
  id: types.optional(types.string, ''),
  alias: types.optional(types.string, ''),
  name: types.optional(types.string, ''),
  image_url: types.optional(types.string, ''),
  is_closed: types.optional(types.boolean, false),
  url: types.optional(types.string, ''),
  review_count: types.optional(types.number, 0),
  categories: types.array(CategoryModel),
  rating: types.optional(types.number, 0),
  coordinates: CoordinatesModel,
  transactions: types.array(types.string),
  price: types.optional(types.string, ''),
  location: LocationModel,
  phone: types.optional(types.string, ''),
  display_phone: types.optional(types.string, ''),
  distance: types.optional(types.number, 0),
});

export interface BusinessInterface extends SnapshotOut<typeof BusinessModel> {}

export {BusinessModel};
