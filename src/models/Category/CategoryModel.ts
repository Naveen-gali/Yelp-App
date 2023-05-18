import {SnapshotOut, types} from 'mobx-state-tree';

const CategoryModel = types.model({
  alias: types.optional(types.string, ''),
  title: types.optional(types.string, ''),
  parent_aliases: types.array(types.optional(types.string, '')),
  country_whitelist: types.array(types.optional(types.string, '')),
  country_blacklist: types.array(types.optional(types.string, '')),
});

export interface CategoryInterface extends SnapshotOut<typeof CategoryModel> {}

export {CategoryModel};
