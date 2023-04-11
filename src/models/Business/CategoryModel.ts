import {SnapshotOut, types} from 'mobx-state-tree';

const CategoryModel = types.model('CategoryModel').props({
  alias: types.optional(types.string, ''),
  title: types.optional(types.string, ''),
});

export interface CategroriesInterface
  extends SnapshotOut<typeof CategoryModel> {}

export {CategoryModel};
