import {SnapshotOut, types} from 'mobx-state-tree';

const AttributesModel = types.model('AttribuesModel').props({
  business_temp_closed: types.optional(types.number, 0),
  outdoor_seating: types.optional(types.boolean, false),
  liked_by_vegans: types.optional(types.boolean, false),
  liked_by_vegetarians: types.optional(types.boolean, false),
  hot_and_new: types.optional(types.string, ''),
});

export interface AttributesInterface
  extends SnapshotOut<typeof AttributesModel> {}

export {AttributesModel};
