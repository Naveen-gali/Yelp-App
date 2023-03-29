import {SnapshotOut, types} from 'mobx-state-tree';

const CoordinatesModel = types.model('CoordinatesModel').props({
  latitude: 0,
  longitude: 0,
});

export interface CoordinatesInterface
  extends SnapshotOut<typeof CoordinatesModel> {}

export {CoordinatesModel};
