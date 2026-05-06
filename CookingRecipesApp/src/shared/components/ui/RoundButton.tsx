import { Pressable, PressableProps, StyleSheet } from 'react-native';
import { Pen, Trash2, SquareArrowRightExit } from 'lucide-react-native';

const iconMap = {
  pen: Pen,
  trash: Trash2,
  exit: SquareArrowRightExit,
};

type IconName = keyof typeof iconMap;

interface RoundButtonProps extends PressableProps {
  variant?: 'primary' | 'secondary';
  icon: IconName;
  sizeIcon?: number;
}
export function RoundButton({ style, icon, sizeIcon = 20, ...rest }: RoundButtonProps) {
  const IconComponent = iconMap[icon];

  return (
    <Pressable
      style={state => [
        styles.buttonContainer,
        typeof style === 'function' ? style(state) : style,
        { opacity: state.pressed ? 0.5 : 1 },
      ]}
      {...rest}>
      <IconComponent size={sizeIcon} color={'#ffffff'} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 40,
    width: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 15,
  },
});
