import {cast, detach, toGenerator, types} from 'mobx-state-tree';
import {AsyncTask, runTask} from 'mst-async-task';
import {CategoryInterface, CategoryModel} from '.';
import {CategoryService} from '../../services';
import {featuredCategories} from '../../utils';

const CategoriesModel = types
  .model('CategoriesModel')
  .props({
    allCategories: types.optional(types.array(CategoryModel), []),
    getCategoriesTask: types.optional(AsyncTask, {}),
    featuredCategories: types.optional(types.array(CategoryModel), []),
  })
  .views(self => ({
    get CategoriesCount() {
      return self.allCategories.length;
    },
  }))
  .actions(self => {
    const getAllCategories = (showError: boolean = true) =>
      runTask(self.getCategoriesTask, function* () {
        const response = yield* toGenerator(
          CategoryService.getAllCategories(showError),
        );
        const categories = response.data.categories;
        self.allCategories = cast(categories);
        detach(self.featuredCategories);
        setFeaturedCategories(categories);
      });

    const setFeaturedCategories = (categories: CategoryInterface[]) => {
      self.featuredCategories = cast(
        featuredCategories(
          categories.filter(category => category.parent_aliases.length === 0),
        ),
      );
    };

    return {getAllCategories};
  });

export {CategoriesModel};
