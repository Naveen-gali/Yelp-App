import {SnapshotOut, types} from 'mobx-state-tree';

const MessagingModel = types.model('MessagingModel').props({
  url: types.optional(types.string, ''),
  use_case_text: types.optional(types.string, ''),
  response_rate: types.optional(types.number, 0),
  response_time: types.optional(types.number, 0),
});

export interface MessagingInterface
  extends SnapshotOut<typeof MessagingModel> {}

export {MessagingModel};
