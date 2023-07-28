import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInput as InputField,
  TextInputEndEditingEventData,
  TextInputFocusEventData,
  View,
} from 'react-native';
import {fontStyles} from '../../constants';
import {useThemeColor} from '../../hooks';
import {Strings} from '../../i18n';
import {horizontalScale, verticalScale} from '../../utils';
import {Label} from '../Label';
import {TextInputProps} from './TextInput.types';

export const TextInput = React.forwardRef((props: TextInputProps, ref) => {
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
    onFocus,
    onEndEditing,
    defaultValue,
    ...restProps
  } = props;
  const [focused, setFocused] = useState(false);
  const {colors} = useThemeColor();

  useEffect(() => {
    if (defaultValue) {
      moveLabelTop();
    }
  });

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
            borderColor: colors.border,
            backgroundColor: colors.disabled,
          },
        ];
      } else if (mode === 'default') {
        return [
          {
            borderBottomColor: colors.border,
          },
        ];
      }
    } else {
      return;
    }
  }, [colors.border, colors.disabled, editable, mode]);

  const floatingLabel = useRef(new Animated.Value(0)).current;

  const yInterpolate = floatingLabel.interpolate({
    inputRange: [0, 1],
    outputRange: [verticalScale(8), verticalScale(-14)],
  });

  const animation = useMemo(() => {
    return {
      transform: [
        {
          translateY: yInterpolate,
        },
      ],
    };
  }, [yInterpolate]);

  const getLabelColor = useMemo(() => {
    if (editable) {
      if (error) {
        return {color: colors.error};
      } else {
        return {color: colors.secondary};
      }
    }
    return {color: colors.placeholder};
  }, [colors.error, colors.placeholder, editable, colors.secondary, error]);

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

  const onFocusHandler = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    moveLabelTop();
    setFocused(true);
    onFocus?.(e);
  };

  const onEndEditingHandler = (
    e: NativeSyntheticEvent<TextInputEndEditingEventData>,
  ) => {
    if (e.nativeEvent.text?.length === 0 || value?.length === 0) {
      moveLabelDown();
    }
    setFocused(false);
    onEndEditing?.(e);
  };

  const TextInputStyles = useMemo(() => {
    return [
      styles.input,
      {
        borderColor: colors.border,
        color: colors.text,
      },
      fontStyles.b1_Text_Regular,
      getStyle,
      focused && mode !== 'border-less'
        ? [{borderColor: colors.secondary}]
        : null,
      error ? {borderColor: colors.error} : null,
      getDisabledStyle,
      inputStyle,
    ];
  }, [
    colors.border,
    colors.error,
    colors.secondary,
    colors.text,
    error,
    focused,
    getDisabledStyle,
    getStyle,
    inputStyle,
    mode,
  ]);

  const animatedLabelStyle = useMemo(() => {
    return [
      animation,
      styles.animatedLabel,
      mode === 'outline'
        ? {
            backgroundColor: colors.background,
          }
        : null,
    ];
  }, [animation, colors.background, mode]);

  const _labelStyle = useMemo(() => {
    return [
      {
        backgroundColor:
          !editable && mode === 'outline' ? colors.disabled : colors.background,
      },
      fontStyles.b3_Text_Italic,
      focused ? [fontStyles.b3_Text_SemiBold, getLabelColor, labelStyle] : null,
      labelStyle,
    ];
  }, [
    colors.background,
    colors.disabled,
    editable,
    focused,
    getLabelColor,
    labelStyle,
    mode,
  ]);

  const renderAnimatedLabel = () => {
    if (label) {
      return (
        <Animated.View style={[animatedLabelStyle]}>
          <Label style={_labelStyle} label={label} />
        </Animated.View>
      );
    }
    return null;
  };

  const renderInputField = () => {
    return (
      <InputField
        style={TextInputStyles}
        onFocus={onFocusHandler}
        placeholder={placeholder}
        editable={editable}
        onChangeText={onChangeText}
        onEndEditing={onEndEditingHandler}
        defaultValue={defaultValue}
        ref={ref}
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
        <Text
          style={[
            styles.errorMessage,
            {color: colors.error},
            errorMessageStyle,
          ]}>
          {errorMessage ?? Strings.input.default_error}
        </Text>
      );
    }

    return null;
  };

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
});

const styles = StyleSheet.create({
  input: {
    flex: 1,
    paddingVertical: verticalScale(9),
    paddingHorizontal: horizontalScale(12),
    borderRadius: verticalScale(3),
    borderBottomWidth: verticalScale(1),
    width: horizontalScale(100),
  },
  hint: {
    marginTop: verticalScale(5),
    marginHorizontal: horizontalScale(5),
  },
  errorMessage: {
    marginTop: verticalScale(5),
  },
  outline: {
    borderWidth: verticalScale(1),
  },
  outlineDisable: {
    borderWidth: verticalScale(1),
  },
  borderLess: {
    borderBottomWidth: 0,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  animatedLabel: {
    top: verticalScale(5),
    left: horizontalScale(12),
    zIndex: 10000,
    overflow: 'hidden',
    position: 'absolute',
  },
});
