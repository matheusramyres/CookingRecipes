import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

interface ButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary';
}
export function ReturnButton({ variant = 'primary', style, ...rest }: ButtonProps) {
  const navigation = useNavigation();
  function goBackPage() {
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  }
  return (
    <Pressable
      style={state => [
        styles.buttonContainer,
        typeof style === 'function' ? style(state) : style,
        {
          backgroundColor: variant === 'primary' ? 'rgba(255, 255, 255, 0.2)' : '#F1E3C7',
        },
        { opacity: state.pressed ? 0.5 : 1 },
      ]}
      {...rest}
      onPress={goBackPage}>
      <ArrowLeft size={20} color={variant === 'primary' ? '#ffffff' : '#2A1F19'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    width: 40,
    borderRadius: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
