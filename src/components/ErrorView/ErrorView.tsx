import React from 'react';
import {Image, Text, View} from 'react-native';
import {ErrorViewProps} from './ErrorView.types';
import {StyleSheet} from 'react-native';
import {Button} from '../Button';
import {horizontalScale, verticalScale} from '../../utils';
import {Strings} from '../../i18n';

const ErrorView = (props: ErrorViewProps) => {
  const {style, text, textStyle, action, image, imageStyle} = props;

  return (
    <View style={[styles.container, style]}>
      {image ? (
        <Image
          source={{
            uri: image,
          }}
          style={[
            {
              height: verticalScale(120),
              width: horizontalScale(150),
            },
            imageStyle,
          ]}
        />
      ) : (
        <></>
      )}
      <Text style={textStyle}>{text}</Text>
      {action ? (
        <Button
          mode="outlined"
          onPress={action}
          style={{
            width: horizontalScale(100),
          }}>
          {Strings.errorViewText.retry}
        </Button>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

export {ErrorView};
