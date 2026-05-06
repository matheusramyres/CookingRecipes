import { StyleSheet, Text, View } from 'react-native';
import { ReturnButton } from './ReturnButton';

interface HeaderProps {
  title: string;
  variant?: 'primary' | 'secondary';
}

export function Header({ title, variant = 'primary' }: HeaderProps) {
  return (
    <View style={[styles.container, variant === 'secondary' ? styles.secondary : styles.primary]}>
      <ReturnButton variant={variant} />
      <Text
        style={[
          styles.title,
          { color: variant === 'secondary' ? styles.secondary.color : styles.primary.color },
        ]}>
        {title}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 16,
    alignItems: 'center',
    padding: 16,
  },
  primary: {
    backgroundColor: '#E46212',
    color: '#ffffff',
  },
  secondary: {
    backgroundColor: 'none',
    color: '#2A1F19',
  },
  title: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 600,
  },
});
