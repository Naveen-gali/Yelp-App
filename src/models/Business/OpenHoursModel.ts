import {SnapshotOut, types} from 'mobx-state-tree';

const OpenHoursModel = types.model('OpenHoursModel').props({
  is_overnight: types.optional(types.boolean, false),
  start: types.optional(types.number, 0),
  end: types.optional(types.number, 0),
  day: types.optional(types.number, 0),
});

export interface OpenHoursInterface
  extends SnapshotOut<typeof OpenHoursModel> {}

export {OpenHoursModel};
