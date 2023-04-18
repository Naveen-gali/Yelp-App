import React from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ButtonProps} from './ButtonProps.types';
import {scale, verticalScale} from '../../utils';
import {useThemeColor} from '../../hooks';
import Icon from 'react-native-vector-icons/Ionicons';

export const Button = (props: ButtonProps) => {
  const {
    children,
    mode,
    isLoading,
    style,
    textStyle,
    disabled,
    onPress,
    icon,
    iconRight,
    iconStyle,
    loaderColor,
    ...restProps
  } = props;

  const {colors} = useThemeColor();

  const getStyle = () => {
    if (mode === 'default') {
      return;
    } else if (mode === 'outlined') {
      return [
        styles.outlied,
        {
          borderColor: colors.primary,
        },
      ];
    } else if (mode === 'text') {
      return styles.textType;
    }
  };

  const getDisabledBtnStyle = () => {
    if (disabled && mode === 'text') {
      return null;
    } else if (disabled && mode === 'default') {
      return {backgroundColor: colors.disabled};
    } else if (disabled && mode === 'outlined') {
      return {borderColor: colors.disabled};
    }
  };

  const getDisabledLabelStyle = () => {
    if (mode === 'default') {
      return;
    } else {
      return {color: 'grey'};
    }
  };

  return (
    <TouchableOpacity
      style={[
        [
          styles.buttonContainer,
          {
            backgroundColor: colors.primary,
          },
        ],
        getStyle(),
        getDisabledBtnStyle(),
        iconRight ? styles.rightIcon : null,
        style,
      ]}
      disabled={disabled || isLoading}
      onPress={onPress}
      {...restProps}>
      {isLoading ? (
        <ActivityIndicator size="small" color={loaderColor} />
      ) : (
        <>
          {icon ? (
            <Icon
              name={icon}
              style={[
                styles.icon,
                {
                  color: mode === 'default' ? colors.text2 : colors.text,
                },
                disabled ? getDisabledLabelStyle() : null,
                iconStyle,
              ]}
            />
          ) : null}
          <Text
            style={[
              styles.text,
              mode !== 'default' ? {color: colors.onPrimary} : null,
              {
                color: mode === 'default' ? colors.text2 : colors.text,
              },
              disabled ? getDisabledLabelStyle() : null,
              textStyle,
            ]}
            lineBreakMode="tail"
            numberOfLines={1}>
            {children}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: scale(10),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    backgroundColor: undefined,
    alignSelf: 'center',
    fontSize: verticalScale(20),
  },
  outlied: {
    borderWidth: scale(1),
    backgroundColor: undefined,
  },
  textType: {
    padding: scale(0),
    borderWidth: scale(0),
    backgroundColor: undefined,
  },
  icon: {
    marginHorizontal: scale(3),
    fontSize: verticalScale(20),
  },
  rightIcon: {
    flexDirection: 'row-reverse',
  },
  leftIcon: {
    flexDirection: 'row',
  },
  textWrapperStyle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
