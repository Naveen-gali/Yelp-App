import {SnapshotOut, types} from 'mobx-state-tree';
import {LocationModel} from '../Common';

const EventModel = types.model({
  id: '',
  attending_count: 0,
  category: '',
  cost: types.maybeNull(types.number),
  cost_max: types.maybeNull(types.number),
  description: '',
  event_site_url: '',
  image_url: '',
  interested_count: 0,
  is_canceled: types.optional(types.boolean, false),
  is_free: types.optional(types.boolean, false),
  is_official: types.optional(types.boolean, false),
  latitude: 0,
  longitude: 0,
  name: types.optional(types.string, ''),
  tickets_url: types.maybeNull(types.string),
  time_end: types.maybeNull(types.string),
  time_start: types.maybeNull(types.string),
  location: types.optional(LocationModel, {}),
  business_id: types.maybeNull(types.string),
});

export interface EventInterface extends SnapshotOut<typeof EventModel> {}

export {EventModel};
