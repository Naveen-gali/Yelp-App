type searchCarouselName = {
  en_US: string;
  ar_US: string;
};

export type SearchCarouselDataType = {
  name: searchCarouselName;
  image: string;
  buttonText: string;
  category: string;
};

export type SearchCarouselDataSuccessResponse = {
  stat: 'ok';
  data: SearchCarouselDataType[];
};
