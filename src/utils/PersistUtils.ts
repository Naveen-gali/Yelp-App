import AsyncStorage from '@react-native-async-storage/async-storage';
import {IStateTreeNode} from 'mobx-state-tree';
import persist from 'mst-persist';

const mstPersist = (
  name: string,
  store: IStateTreeNode,
  whitelist: Array<string>,
  blacklist: Array<string>,
  jsonify: boolean = true,
) => {
  return persist(name, store, {
    storage: AsyncStorage,
    jsonify: jsonify,
    whitelist,
    blacklist,
  });
};

export {mstPersist};
