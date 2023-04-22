/* do not change this file, it is auto generated by storybook. */

import {
  configure,
  addDecorator,
  addParameters,
  addArgsEnhancer,
  clearDecorators,
} from '@storybook/react-native';

global.STORIES = [
  {
    titlePrefix: '',
    directory: './src/components',
    files: '**/*.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      '^\\.[\\\\/](?:src\\/components(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$',
  },
  {
    titlePrefix: '',
    directory: './src/assets',
    files: '**/*.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      '^\\.[\\\\/](?:src\\/assets(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$',
  },
  {
    titlePrefix: '',
    directory: './src/screens',
    files: '**/*.stories.?(ts|tsx|js|jsx)',
    importPathMatcher:
      '^\\.[\\\\/](?:src\\/screens(?:\\/(?!\\.)(?:(?:(?!(?:^|\\/)\\.).)*?)\\/|\\/|$)(?!\\.)(?=.)[^/]*?\\.stories\\.(?:ts|tsx|js|jsx)?)$',
  },
];

import '@storybook/addon-ondevice-controls/register';
import '@storybook/addon-ondevice-actions/register';

import {argsEnhancers} from '@storybook/addon-actions/dist/modern/preset/addArgs';

try {
  argsEnhancers.forEach(enhancer => addArgsEnhancer(enhancer));
} catch {}

const getStories = () => {
  return {
    './src/components/Button/Button.stories.tsx': require('../src/components/Button/Button.stories.tsx'),
    './src/components/Carousel/Carousel.stories.tsx': require('../src/components/Carousel/Carousel.stories.tsx'),
    './src/screens/HomeScreen/components/SearchCarousel/SearchCarousel.stories.tsx': require('../src/screens/HomeScreen/components/SearchCarousel/SearchCarousel.stories.tsx'),
    './src/components/CustomIcon/CustomIcon.stories.tsx': require('../src/components/CustomIcon/CustomIcon.stories.tsx'),
    './src/assets/stories/Fonts.stories.tsx': require('../src/assets/stories/Fonts.stories.tsx'),
    './src/assets/stories/Svgs.stories.tsx': require('../src/assets/stories/Svgs.stories.tsx'),
  };
};

configure(getStories, module, false);
