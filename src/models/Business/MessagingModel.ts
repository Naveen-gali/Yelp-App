import {SnapshotOut, types} from 'mobx-state-tree';

const MessagingModel = types.model('MessagingModel').props({
  url: '',
  use_case_text: '',
  response_rate: 0,
  response_time: 0,
});

export interface MessagingInterface
  extends SnapshotOut<typeof MessagingModel> {}

export {MessagingModel};
