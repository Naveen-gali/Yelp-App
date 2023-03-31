import {SnapshotOut, types} from 'mobx-state-tree';
import {OpenHoursModel} from './OpenHoursModel';

const HoursModel = types.model('HoursModel').props({
  open: types.array(OpenHoursModel),
  hours_type: '',
  is_open_now: false,
});

export interface HoursInterface extends SnapshotOut<typeof HoursModel> {}

export {HoursModel};
