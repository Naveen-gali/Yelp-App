import {SnapshotOut, types} from 'mobx-state-tree';

const LocationModel = types.model('LocationModel').props({
  address1: types.maybeNull(types.string),
  address2: types.maybeNull(types.string),
  address3: types.maybeNull(types.string),
  city: '',
  zip_code: '',
  country: '',
  state: '',
  display_address: types.array(types.string),
});

export interface LocationInterface extends SnapshotOut<typeof LocationModel> {}

export {LocationModel};
