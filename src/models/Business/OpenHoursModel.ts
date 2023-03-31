import {SnapshotOut, types} from 'mobx-state-tree';

const OpenHoursModel = types.model('OpenHoursModel').props({
  is_overnight: false,
  start: 0,
  end: 0,
  day: 0,
});

export interface OpenHoursInterface
  extends SnapshotOut<typeof OpenHoursModel> {}

export {OpenHoursModel};
