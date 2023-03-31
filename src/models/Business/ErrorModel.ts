import {SnapshotOut, types} from 'mobx-state-tree';

const ErrorModel = types.model('ErrorModel').props({
  code: '',
  description: '',
});

export interface ErrorInterface extends SnapshotOut<typeof ErrorModel> {}

export {ErrorModel};
