import {Api, ApiConstants} from '../../api';
import {AllCategories} from './CategoryService.types';

function getAllCategories(showError: boolean = true) {
  return Api<AllCategories>(
    {
      method: 'get',
      url: ApiConstants.categories.all,
      params: {
        locale: 'en_US',
      },
    },
    showError,
  );
}

export {getAllCategories};
