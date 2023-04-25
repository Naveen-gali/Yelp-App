import {LocalizedLanguages} from '../../../../i18n';

export type CarouselDataItem = {
  name: LocalizedLanguages;
  image: string;
  buttonText: LocalizedLanguages;
  category: string;
};

export type SearchCarouselType = {
  carouselData: CarouselDataItem[];
};
