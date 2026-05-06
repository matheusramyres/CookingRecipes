import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  textButton: string;
  variant?: 'primary' | 'secondary';
}
export function Button({ textButton, variant = 'primary', style, disabled, ...rest }: ButtonProps) {
  const background = variant === 'secondary' ? '#FBF8F1' : '#E46212';
  return (
    <Pressable
      disabled={disabled}
      style={state => [
        styles.buttonContainer,
        typeof style === 'function' ? style(state) : style,
        { opacity: state.pressed ? 0.5 : 1 },
        { backgroundColor: disabled ? '#F1B088' : background },
        variant === 'secondary' ? styles.borderButton : '',
      ]}
      {...rest}>
      <Text
        style={[
          styles.textButton,
          variant === 'secondary' ? styles.secondaryText : styles.primaryText,
        ]}>
        {textButton}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E46212',
    borderRadius: 20,
    paddingHorizontal: 15,
  },
  textButton: {
    fontSize: 16,
    fontWeight: 600,
  },
  primaryText: {
    color: '#fff',
  },
  secondaryText: {
    color: '#000',
  },
  borderButton: {
    borderWidth: 1,
    borderColor: '#DDD7C9',
  },
});
