import {SnapshotOut, types} from 'mobx-state-tree';

const ErrorModel = types.model('ErrorModel').props({
  description: '',
  show_error_screen: false,
});

export interface ErrorInterface extends SnapshotOut<typeof ErrorModel> {}

export {ErrorModel};
