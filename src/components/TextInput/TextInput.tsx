import React, {useMemo, useRef, useState} from 'react';
import {
  Animated,
  TextInput as InputField,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
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
    onFocus,
    onEndEditing,
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
        return [{borderBottomColor: colors.placeholder}];
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

  const animation = useMemo(() => {
    return {
      transform: [
        {
          translateY: yInterpolate,
        },
      ],
    };
  }, [yInterpolate]);

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
  }, [
    colors.border,
    colors.error,
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

  const showLabelStyle = useMemo(() => {
    return [
      {
        backgroundColor:
          !editable && mode === 'outline' ? colors.disabled : colors.background,
        color: colors.text,
      },
      fontStyles.b3_Text_Italic,
      focused ? [fontStyles.b3_Text_SemiBold, labelStyle] : null,
    ];
  }, [
    colors.background,
    colors.disabled,
    colors.text,
    editable,
    focused,
    labelStyle,
    mode,
  ]);

  const animatedLabel = () => {
    if (label) {
      return (
        <Animated.View style={animatedLabelStyle}>
          <Label style={showLabelStyle} label={label} />
        </Animated.View>
      );
    }
    return null;
  };

  const inputField = () => {
    return (
      <InputField
        style={TextInputStyles}
        onFocus={onFocusHandler}
        placeholder={placeholder}
        editable={editable}
        onChangeText={onChangeText}
        onEndEditing={onEndEditingHandler}
        {...restProps}
      />
    );
  };

  const hintAndError = () => {
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

  return (
    <View style={[style]}>
      <View style={styles.inputContainer}>
        {left ?? null}
        {animatedLabel()}
        {inputField()}
        {right ?? null}
      </View>
      {hintAndError()}
    </View>
  );
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
