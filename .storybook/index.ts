import {getStorybookUI} from '@storybook/react-native';
import {Decorator} from './decorators';

import './storybook.requires';

const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
export {Decorator};
