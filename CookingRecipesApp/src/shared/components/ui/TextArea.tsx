import { useState } from 'react';
import { StyleSheet, Text, TextInput, TextInputProps, View } from 'react-native';

interface TextAreaProps extends TextInputProps {
  label: string;
  background?: 'primary' | 'secondary';
  errorMessage?: string;
}

export function TextArea({
  label,
  background = 'primary',
  placeholder,
  style,
  errorMessage,
  ...rest
}: TextAreaProps) {
  const [isFocused, setIsFocused] = useState(false);

  const borderColorState = errorMessage ? '#f50000ff' : isFocused ? '#d6b980' : '#F1E3C7';
  const backgroundColor = background === 'secondary' ? '#fff' : '#F1E3C7';

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <TextInput
        placeholder={placeholder}
        multiline
        textAlignVertical="top"
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={[
          styles.textArea,
          style,
          {
            backgroundColor,
            borderColor: borderColorState,
          },
        ]}
        {...rest}
      />

      {!!errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
  },

  textArea: {
    minHeight: 120,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 12,
    paddingHorizontal: 15,
    paddingTop: 14,
    paddingBottom: 14,
    fontSize: 14,
  },

  error: {
    color: '#f50000ff',
    marginTop: 6,
    fontSize: 12,
  },
});
