import { Pressable, PressableProps, StyleSheet, Text } from 'react-native';

interface ButtonProps extends PressableProps {
  textButton: string;
}
export function Button({ textButton, style, ...rest }: ButtonProps) {
  return (
    <Pressable
      style={state => [
        styles.buttonContainer,
        typeof style === 'function' ? style(state) : style,
        { opacity: state.pressed ? 0.5 : 1 },
      ]}
      {...rest}>
      <Text style={styles.textButton}>{textButton}</Text>
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
    fontWeight: 'semibold',
    color: '#ffffff',
  },
});
