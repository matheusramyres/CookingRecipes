import { Eye, EyeOff } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  label: string;
  variation?: 'input' | 'password';
}

export function Input({ label, variation, placeholder }: InputProps) {
  const isPassword = variation === 'password';
  const [showPassword, setShowPassword] = useState(false);

  function togglePassword() {
    setShowPassword(prev => !prev);
  }

  return (
    <View style={styles.inputContainer}>
      <Text>{label}</Text>
      <View style={styles.boxConatiner}>
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          secureTextEntry={isPassword && !showPassword}
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
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
  },
  boxConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E3C7',
    borderRadius: 20,
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
