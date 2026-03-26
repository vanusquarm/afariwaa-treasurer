import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../constants/colors';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'danger';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export default function Button({
  text,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  style,
  textStyle,
}: ButtonProps) {
  const getButtonStyle = (): ViewStyle => {
    const base: ViewStyle = {
      borderRadius: size === 'small' ? 8 : size === 'large' ? 12 : 10,
      paddingVertical: size === 'small' ? 8 : size === 'large' ? 14 : 12,
      paddingHorizontal: size === 'small' ? 12 : size === 'large' ? 24 : 16,
      alignItems: 'center',
      justifyContent: 'center',
    };

    let variantStyle: ViewStyle = {};
    switch (variant) {
      case 'primary':
        variantStyle = { backgroundColor: COLORS.primary };
        break;
      case 'secondary':
        variantStyle = { backgroundColor: COLORS.secondary };
        break;
      case 'outline':
        variantStyle = {
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderColor: COLORS.primary,
        };
        break;
      case 'danger':
        variantStyle = { backgroundColor: COLORS.danger };
        break;
    }

    return { ...base, ...variantStyle, opacity: disabled ? 0.6 : 1 };
  };

  const getTextStyle = (): TextStyle => {
    const base: TextStyle = {
      fontWeight: '600',
      fontSize: size === 'small' ? 12 : size === 'large' ? 16 : 14,
    };

    let variantStyle: TextStyle = {};
    switch (variant) {
      case 'primary':
      case 'secondary':
      case 'danger':
        variantStyle = { color: COLORS.surface };
        break;
      case 'outline':
        variantStyle = { color: COLORS.primary };
        break;
    }

    return { ...base, ...variantStyle };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.8}
    >
      <Text style={[getTextStyle(), textStyle]}>{text}</Text>
    </TouchableOpacity>
  );
}
