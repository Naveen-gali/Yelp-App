import {SnapshotOut, types} from 'mobx-state-tree';

const PhotoDetailsModel = types.model('PhotoDetailsModel').props({
  photo_id: '',
  url: '',
  caption: '',
  width: '',
  height: '',
  is_user_submitted: '',
  user_id: '',
  label: '',
});

export interface PhotoDetailsInterface
  extends SnapshotOut<typeof PhotoDetailsModel> {}

export {PhotoDetailsModel};
