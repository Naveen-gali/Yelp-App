import React from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {DeviceUtils} from '../utils';

type Props = {
  children: React.ReactNode;
};

const KeyBoardAvoidingScrollViewWrapper = (props: Props) => {
  const {children} = props;

  return (
    <KeyboardAvoidingView behavior={DeviceUtils.isIos ? 'padding' : 'height'}>
      <ScrollView bounces={true} automaticallyAdjustKeyboardInsets={true}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export {KeyBoardAvoidingScrollViewWrapper};
