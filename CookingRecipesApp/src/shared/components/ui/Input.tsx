import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  variation?: 'input' | 'password';
  background?: 'primary' | 'secondary';
  errorMessage?: string;
}

export function Input({
  label,
  variation,
  background = 'primary',
  placeholder,
  style,
  errorMessage,
  ...rest
}: InputProps) {
  const isPassword = variation === 'password';
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const borderColorState = errorMessage ? '#f50000ff' : isFocused ? '#d6b980' : '#F1E3C7';
  const backgroundColor = background === 'secondary' ? '#fff' : '#F1E3C7';

  function togglePassword() {
    setShowPassword(prev => !prev);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.boxConatiner,
          style,
          { backgroundColor: backgroundColor },
          { borderColor: borderColorState },
        ]}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={isPassword && !showPassword}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...rest}
        />

        {isPassword && (
          <Pressable
            onPress={togglePassword}
            hitSlop={10}
            style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
            {showPassword ? <EyeOff size={24} color="#000" /> : <Eye size={24} color="#000" />}
          </Pressable>
        )}
      </View>

      {errorMessage !== undefined && <Text style={{ color: '#f50000ff' }}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  boxConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 15,
    gap: 10,
    marginTop: 12,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 14,
  },
});
