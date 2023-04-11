import {SnapshotOut, types} from 'mobx-state-tree';

const PhotoDetailsModel = types.model('PhotoDetailsModel').props({
  photo_id: types.optional(types.string, ''),
  url: types.optional(types.string, ''),
  caption: types.optional(types.string, ''),
  width: types.optional(types.string, ''),
  height: types.optional(types.string, ''),
  is_user_submitted: types.optional(types.string, ''),
  user_id: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
});

export interface PhotoDetailsInterface
  extends SnapshotOut<typeof PhotoDetailsModel> {}

export {PhotoDetailsModel};
