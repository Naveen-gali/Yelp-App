import {TextInputProps} from '../TextInput';

export type SearchBarProps = Omit<TextInputProps, 'label' | 'left'>;
