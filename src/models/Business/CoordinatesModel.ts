import {SnapshotOut, types} from 'mobx-state-tree';

const CoordinatesModel = types.model('CoordinatesModel').props({
  latitude: types.maybeNull(types.number),
  longitude: types.maybeNull(types.number),
});

export interface CoordinatesInterface
  extends SnapshotOut<typeof CoordinatesModel> {}

export {CoordinatesModel};
