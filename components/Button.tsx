// CustomButton.tsx
import Theme from '@/utils/colors';
import React from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TextStyle,
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    ViewStyle,
} from 'react-native';

export type ButtonTheme = 'primary' | 'secondary';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonRounded = 'sm' | 'md' | 'lg' | 'xl' | 'full';

interface ThemeConfig {
  backgroundColor: string;
  borderColor: string;
  textColor: string;
  pressedBackgroundColor: string;
  pressedBorderColor: string;
  pressedTextColor?: string;
}

interface CustomButtonProps extends Omit<TouchableOpacityProps, 'style'> {
  title?: string;
  onPress?: () => void;
  disabled?: boolean;
  loading?: boolean;
  theme?: ButtonTheme;
  size?: ButtonSize;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  textStyle?: TextStyle;
  buttonStyle?: ViewStyle;
  activeOpacity?: number;
  shadow?: boolean;
  rounded?: ButtonRounded;
  hapticFeedback?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({
  title,
  onPress,
  disabled = false,
  loading = false,
  theme = 'primary',
  size = 'medium',
  fullWidth = false,
  leftIcon,
  rightIcon,
  textStyle,
  buttonStyle,
  activeOpacity = 0.8,
  shadow = false,
  rounded = 'md',
  hapticFeedback = true,
  testID,
  accessibilityLabel,
  accessibilityHint,
  ...props
}) => {
    const buttonThemes: Record<ButtonTheme, ThemeConfig> = {
        primary: {
          backgroundColor: Theme.primary,
          borderColor: Theme.primary,
          textColor: Theme.inverse,
          pressedBackgroundColor: Theme.primaryDark,
          pressedBorderColor: Theme.primaryDark,
        },
        secondary: {
          backgroundColor: Theme.secondary,
          borderColor: Theme.secondary,
          textColor: Theme.inverse,
          pressedBackgroundColor: Theme.secondaryDark,
          pressedBorderColor: Theme.secondaryDark,
        },
        
      };

  const themeConfig = buttonThemes[theme];

  const getBorderRadius = (): number => {
    const borderRadiusMap: Record<ButtonRounded, number> = {
      sm: 4,
      md: 8,
      lg: 12,
      xl: 16,
      full: 9999,
    };
    return borderRadiusMap[rounded];
  };

  const getSizeStyles = (): ViewStyle => {
    const sizeMap: Record<ButtonSize, ViewStyle> = {
      small: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        minHeight: 36,
      },
      medium: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        minHeight: 48,
      },
      large: {
        paddingVertical: 24,
        paddingHorizontal: 32,
        minHeight: 56,
      },
    };
    return sizeMap[size];
  };

  const getTextSizeStyles = (): TextStyle => {
    const textSizeMap: Record<ButtonSize, TextStyle> = {
      small: {
        fontSize: 14,
        fontWeight: '500',
      },
      medium: {
        fontSize: 16,
        fontWeight: '600',
      },
      large: {
        fontSize: 18,
        fontWeight: '700',
      },
    };
    return textSizeMap[size];
  };

  const getShadowStyles = (): ViewStyle => {
    if (!shadow) return {};
    
    return {
      shadowColor: Theme.black,
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    };
  };

  const getButtonStyles = (): ViewStyle[] => {
    const baseStyles: ViewStyle = {
      borderRadius: getBorderRadius(),
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 1,
      flexDirection: 'row',
      ...getSizeStyles(),
      ...getShadowStyles(),
    };

    const themeStyles: ViewStyle = {
      backgroundColor: themeConfig.backgroundColor,
      borderColor: themeConfig.borderColor,
    };

    const conditionalStyles: ViewStyle = {
      ...(fullWidth && { width: '100%' }),
      ...(disabled || loading) && {
        backgroundColor: Theme.disabled,
        borderColor: Theme.disabled,
        opacity: 0.6,
      },
    };

    return [baseStyles, themeStyles, conditionalStyles, buttonStyle];
  };

  const getTextStyles = (): TextStyle[] => {
    const baseTextStyles: TextStyle = {
      textAlign: 'center',
      ...getTextSizeStyles(),
    };

    const themeTextStyles: TextStyle = {
      color: disabled || loading ? Theme.disabledText : themeConfig.textColor,
    };

    return [baseTextStyles, themeTextStyles, textStyle];
  };

  const handlePress = (): void => {
    if (disabled || loading) return;
    
    // Add haptic feedback if enabled (would need expo-haptics)
    if (hapticFeedback) {
      // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    
    onPress?.();
  };

  const renderContent = (): React.ReactNode => {
    if (loading) {
      return (
        <View style={styles.contentContainer}>
          <ActivityIndicator
            size="small"
            color={disabled ? Theme.disabledText : themeConfig.textColor}
            style={styles.loader}
          />
        </View>
      );
    }

    return (
      <View style={styles.contentContainer}>
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        {title && <Text style={getTextStyles()}>{title}</Text>}
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </View>
    );
  };

  return (
    <TouchableOpacity
      style={getButtonStyles()}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={activeOpacity}
      testID={testID}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      {...props}
    >
      {renderContent()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loader: {
    marginRight: 8,
  },
  leftIcon: {
    marginRight: 8,
  },
  rightIcon: {
    marginLeft: 8,
  },
});

export default CustomButton;