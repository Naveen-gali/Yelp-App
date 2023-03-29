import {SnapshotOut, types} from 'mobx-state-tree';

const SpecialHoursModel = types.model('SpecialHoursModel').props({
  date: '',
  end: '',
  is_closed: false,
  is_overnight: false,
  start: '',
});

export interface SpecialHoursInterface
  extends SnapshotOut<typeof SpecialHoursModel> {}

export {SpecialHoursModel};
