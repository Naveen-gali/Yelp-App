import {SnapshotOut, types} from 'mobx-state-tree';

const CategoryModel = types.model('CategoryModel').props({
  alias: '',
  title: '',
});

export interface CategroriesInterface
  extends SnapshotOut<typeof CategoryModel> {}

export {CategoryModel};
