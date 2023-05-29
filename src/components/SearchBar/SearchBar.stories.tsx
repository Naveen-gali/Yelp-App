import {StoryObj} from '@storybook/react-native';
import {Decorator} from '../../../.storybook';
import {horizontalScale} from '../../utils';
import {SearchBar} from './SearchBar';
import {SearchBarProps} from './SearchBar.types';

const SearchBarComp = {
  title: 'SearchBar',
  component: SearchBar,
  decorators: [Decorator],
};

export default SearchBarComp;

type Story = StoryObj<SearchBarProps>;

export const MySearchBar: Story = {
  args: {
    placeholder: 'SearchBar Placeholder',
    editable: true,
    style: {
      marginHorizontal: horizontalScale(17),
      padding: horizontalScale(10),
      width: horizontalScale(360),
      borderRadius: horizontalScale(6),
      backgroundColor: '#EBEBEB',
    },
    inputStyle: {
      borderBottomWidth: 0,
    },
  },
  argTypes: {
    onChangeText: {
      action: 'onChangeText',
    },
    hint: {
      control: {type: 'text'},
    },
    error: {
      control: {type: 'boolean'},
    },
    errorMessage: {
      control: {type: 'text'},
    },
    editable: {
      control: {type: 'boolean'},
    },
    multiline: {
      control: {type: 'boolean'},
    },
  },
};
