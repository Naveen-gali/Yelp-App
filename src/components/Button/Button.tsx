import React, {useMemo} from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {ButtonProps} from './Button.types';
import {horizontalScale, verticalScale} from '../../utils';
import {useThemeColor} from '../../hooks';
import {CustomIcon} from '../CustomIcon';
import {fontStyles} from '../../constants';

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

  const getStyle = useMemo(() => {
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
  }, [colors.primary, colors.transparent, mode]);

  const getDisabledBtnStyle = useMemo(() => {
    if (!disabled || mode === 'text') {
      return null;
    } else if (mode === 'default') {
      return {backgroundColor: colors.disabled};
    } else if (mode === 'outlined') {
      return {borderColor: colors.disabled};
    }
  }, [colors.disabled, disabled, mode]);

  const disabledLabelStyle = useMemo(() => {
    if (disabled && mode !== 'default') {
      return {color: colors.disabled};
    }
    return null;
  }, [colors.disabled, disabled, mode]);

  const getTextStyle = useMemo(() => {
    if (mode === 'default') {
      return {color: colors.text2};
    } else {
      return {color: colors.text};
    }
  }, [colors.text, colors.text2, mode]);

  const renderIcon = () => {
    if (icon) {
      return (
        <CustomIcon
          name={icon}
          style={[
            styles.icon,
            getTextStyle,
            disabledLabelStyle,
            isLoading ? styles.hidden : styles.show,
            fontStyles.b1_Text_Regular,
            iconStyle,
          ]}
        />
      );
    }
    return null;
  };

  const renderText = () => {
    return (
      <Text
        style={[
          styles.text,
          getTextStyle,
          disabledLabelStyle,
          isLoading ? styles.hidden : styles.show,
          fontStyles.b1_Text_Regular,
          textStyle,
        ]}
        lineBreakMode="tail"
        numberOfLines={1}>
        {children}
      </Text>
    );
  };

  const ButtonStyles = [
    [
      styles.buttonContainer,
      {
        backgroundColor: colors.primary,
      },
    ],
    getStyle,
    getDisabledBtnStyle,
    iconRight ? styles.rightIcon : null,
    style,
  ];

  const renderLoader = () => {
    if (isLoading) {
      return (
        <ActivityIndicator
          size="small"
          color={loaderColor}
          style={styles.loader}
        />
      );
    }
    return null;
  };

  return (
    <TouchableOpacity
      style={ButtonStyles}
      disabled={disabled || isLoading}
      onPress={onPress}
      {...restProps}>
      <>
        {renderLoader()}
        {renderIcon()}
        {renderText()}
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: horizontalScale(10),
    paddingVertical: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    alignSelf: 'center',
  },
  outlined: {
    borderWidth: horizontalScale(1),
  },
  textType: {
    padding: 0,
    borderWidth: 0,
  },
  icon: {
    marginHorizontal: horizontalScale(3),
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
  loader: {
    position: 'absolute',
  },
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
});
