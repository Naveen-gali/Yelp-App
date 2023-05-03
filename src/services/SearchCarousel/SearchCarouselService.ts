import {SearchCarouselData} from '../../assets/data';
import {SearchCarouselDataSuccessResponse} from './SearchCarouselServices.types';

const getSearchCarouselData =
  (): Promise<SearchCarouselDataSuccessResponse> => {
    return new Promise((resolve, _reject) => {
      setTimeout(
        () =>
          resolve({
            stat: 'ok',
            data: SearchCarouselData,
          }),
        30,
      );
    });
  };

export {getSearchCarouselData};
