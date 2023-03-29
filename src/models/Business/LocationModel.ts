import {SnapshotOut, types} from 'mobx-state-tree';

const LocationModel = types.model('LocationModel').props({
  address1: '',
  address2: '',
  address3: '',
  city: '',
  zip_code: '',
  country: '',
  state: '',
  display_address: types.array(types.string),
});

export interface LocationInterface extends SnapshotOut<typeof LocationModel> {}

export {LocationModel};
