import React, {useMemo, useRef, useState} from 'react';
import {
  Animated,
  TextInput as InputField,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {horizontalScale, verticalScale} from '../../utils';
import {Label} from '../Label';
import {TextInputProps} from './TextInput.types';

export const TextInput = (props: TextInputProps) => {
  const {
    mode = 'default',
    onChangeText,
    hint,
    style,
    placeholder,
    hintStyle,
    error,
    errorMessage,
    errorMessageStyle,
    label,
    labelStyle,
    editable,
    inputStyle,
    left,
    right,
    value,
    ...restProps
  } = props;
  const [focused, setFocused] = useState(false);
  const {colors} = useThemeColor();

  const getStyle = useMemo(() => {
    if (mode === 'outline') {
      return styles.outline;
    } else if (mode === 'border-less') {
      return styles.borderLess;
    }
    return;
  }, [mode]);

  const getDisabledStyle = useMemo(() => {
    if (!editable) {
      if (mode === 'outline') {
        return [
          styles.outlineDisable,
          {
            borderColor: colors.placeholder,
            backgroundColor: colors.disabled,
          },
        ];
      } else if (mode === 'default') {
        return [styles.defaultDisable, {borderBottomColor: colors.placeholder}];
      }
    } else {
      return;
    }
  }, [colors.disabled, colors.placeholder, editable, mode]);

  const floatingLabel = useRef(new Animated.Value(0)).current;

  const yInterpolate = floatingLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [4, -15],
  });

  const animation = {
    transform: [
      {
        translateY: yInterpolate,
      },
    ],
  };

  const moveLabelTop = () => {
    Animated.timing(floatingLabel, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const moveLabelDown = () => {
    Animated.timing(floatingLabel, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const onFocusHandler = () => {
    moveLabelTop();
  };

  const onBlurHandler = (e: string) => {
    if (e?.length === 0 || value?.length === 0) {
      moveLabelDown();
    }
  };

  const renderAnimatedLabel = () => {
    const animatedLabelStyle = [
      animation,
      styles.animatedLabel,
      mode === 'outline'
        ? {
            backgroundColor: colors.background,
          }
        : null,
    ];

    const renderLabelStyle = [
      {
        backgroundColor:
          !editable && mode === 'outline' ? colors.disabled : colors.background,
        color: colors.text,
      },
      fontStyles.b3_Text_Italic,
      focused ? [fontStyles.b3_Text_SemiBold, labelStyle] : null,
    ];

    if (label) {
      return (
        <Animated.View style={animatedLabelStyle}>
          <Label style={renderLabelStyle} label={label} />
        </Animated.View>
      );
    }
    return null;
  };

  const onFocus = () => {
    onFocusHandler();
    setFocused(true);
    restProps.onFocus;
  };

  const onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlurHandler(e.nativeEvent.text);
    setFocused(false);
    restProps.onBlur;
  };

  const TextInputStyles = [
    styles.input,
    {
      borderBottomColor: colors.text,
      color: colors.text,
    },
    fontStyles.b1_Text_Regular,
    getStyle,
    focused && mode !== 'border-less'
      ? [styles.focused, {borderBottomColor: colors.border}]
      : null,
    error ? {borderColor: colors.error} : null,
    getDisabledStyle,
    inputStyle,
  ];

  const renderInputField = () => {
    return (
      <InputField
        style={TextInputStyles}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        editable={editable}
        onChangeText={onChangeText}
        {...restProps}
      />
    );
  };

  const renderHintAndError = () => {
    if (hint && !error) {
      return (
        <Text
          style={[
            styles.hint,
            {color: colors.text},
            fontStyles.b3_Text_Italic,
            hintStyle,
          ]}>
          {hint}
        </Text>
      );
    } else if (error) {
      return (
        <Text style={[{color: colors.error}, errorMessageStyle]}>
          {errorMessage ?? Strings.input.default_error}
        </Text>
      );
    }

    return null;
  };

  const renderContent = () => {
    return (
      <View style={[style]}>
        <View style={styles.inputContainer}>
          {left ?? null}
          {renderAnimatedLabel()}
          {renderInputField()}
          {right ?? null}
        </View>
        {renderHintAndError()}
      </View>
    );
  };

  return renderContent();
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    padding: verticalScale(9),
    borderRadius: verticalScale(3),
    borderBottomWidth: verticalScale(2),
    width: horizontalScale(100),
  },
  focused: {
    borderBottomWidth: verticalScale(2),
  },
  hint: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(5),
  },
  errorMessage: {
    marginTop: verticalScale(5),
    marginLeft: horizontalScale(5),
  },
  outline: {
    borderWidth: verticalScale(1),
  },
  outlineDisable: {
    borderWidth: verticalScale(1),
  },
  defaultDisable: {
    borderBottomWidth: verticalScale(3),
  },
  borderLess: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: horizontalScale(7),
  },
  animatedLabel: {
    top: verticalScale(5),
    left: horizontalScale(15),
    zIndex: 10000,
    overflow: 'hidden',
    position: 'absolute',
  },
});
