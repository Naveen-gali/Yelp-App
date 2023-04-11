import {SnapshotOut, types} from 'mobx-state-tree';

const SpecialHoursModel = types.model('SpecialHoursModel').props({
  date: types.optional(types.string, ''),
  end: types.optional(types.string, ''),
  is_closed: types.optional(types.boolean, false),
  is_overnight: types.optional(types.boolean, false),
  start: types.optional(types.string, ''),
});

export interface SpecialHoursInterface
  extends SnapshotOut<typeof SpecialHoursModel> {}

export {SpecialHoursModel};
