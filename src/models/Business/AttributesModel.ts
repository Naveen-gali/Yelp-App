import {SnapshotOut, types} from 'mobx-state-tree';

const AttributesModel = types.model('AttribuesModel').props({
  business_temp_closed: 0,
  outdoor_seating: false,
  liked_by_vegans: false,
  liked_by_vegetarians: false,
  hot_and_new: '',
});

export interface AttributesInterface
  extends SnapshotOut<typeof AttributesModel> {}

export {AttributesModel};
