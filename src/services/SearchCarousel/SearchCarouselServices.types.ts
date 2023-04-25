import {localizedLanguagesStrings} from '../../i18n';

type SearchCarouselDataType = {
  name: localizedLanguagesStrings;
  image: string;
  buttonText: localizedLanguagesStrings;
  category: string;
};

// TODO: Update after events api to SuccessResponse<> kind
export type SearchCarouselDataSuccessResponse = {
  stat: 'ok';
  data: SearchCarouselDataType[];
};
