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
  const {colors} = useThemeColor();

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
    loaderColor = colors.loader,
    ...restProps
  } = props;

  const getStyle = () => {
    if (mode === 'outlined') {
      return [
        styles.outlined,
        {
          borderColor: colors.primary,
          backgroundColor: colors.transparent,
        },
      ];
    } else if (mode === 'text') {
      return [
        styles.textType,
        {
          backgroundColor: colors.transparent,
        },
      ];
    }
    return null;
  };

  const getDisabledBtnStyle = () => {
    if (!disabled) {
      return;
    } else if (mode === 'text') {
      return null;
    } else if (mode === 'default') {
      return {backgroundColor: colors.disabled};
    } else if (mode === 'outlined') {
      return {borderColor: colors.disabled};
    }
  };

  const getDisabledLabelStyle = () => {
    if (mode === 'default') {
      return;
    } else {
      return {color: colors.disabled};
    }
  };

  function renderIcon(name: string) {
    return (
      <Icon
        name={name}
        style={[
          styles.icon,
          {
            color: mode === 'default' ? colors.text2 : colors.text,
          },
          disabled ? getDisabledLabelStyle() : null,
          iconStyle,
        ]}
      />
    );
  }

  function renderText() {
    return (
      <Text
        style={[
          styles.text,
          {
            backgroundColor: colors.transparent,
          },
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
    );
  }

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
          {icon ? renderIcon(icon) : null}
          {renderText()}
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
    alignSelf: 'center',
    fontSize: verticalScale(20),
  },
  outlined: {
    borderWidth: scale(1),
  },
  textType: {
    padding: 0,
    borderWidth: 0,
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
