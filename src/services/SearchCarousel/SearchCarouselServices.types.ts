import {LocalizedLanguages} from '../../i18n';

type SearchCarouselDataType = {
  name: LocalizedLanguages;
  image: string;
  buttonText: LocalizedLanguages;
  category: string;
};

// TODO: Update after events api to SuccessResponse<> kind
export type SearchCarouselDataSuccessResponse = {
  stat: 'ok';
  data: SearchCarouselDataType[];
};
