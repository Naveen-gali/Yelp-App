import {SnapshotOut, types} from 'mobx-state-tree';
import {CategoryModel} from './CategoryModel';
import {CoordinatesModel} from './CoordinatesModel';
import {LocationModel} from './LocationModel';

const BusinessModel = types.model('BusinessModel').props({
  id: '',
  alias: '',
  name: '',
  image_url: '',
  is_closed: false,
  url: '',
  review_count: 0,
  categories: types.array(CategoryModel),
  rating: 0,
  coordinates: CoordinatesModel,
  transactions: types.array(types.string),
  price: '',
  location: LocationModel,
  phone: '',
  display_phone: '',
  distance: 0,
});

export interface BusinessInterface extends SnapshotOut<typeof BusinessModel> {}

export {BusinessModel};
