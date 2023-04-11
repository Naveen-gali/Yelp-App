import {SnapshotOut, types} from 'mobx-state-tree';

const LocationModel = types.model('LocationModel').props({
  address1: types.maybeNull(types.string),
  address2: types.maybeNull(types.string),
  address3: types.maybeNull(types.string),
  city: types.optional(types.string, ''),
  zip_code: types.optional(types.string, ''),
  country: types.optional(types.string, ''),
  state: types.optional(types.string, ''),
  display_address: types.array(types.string),
});

export interface LocationInterface extends SnapshotOut<typeof LocationModel> {}

export {LocationModel};
