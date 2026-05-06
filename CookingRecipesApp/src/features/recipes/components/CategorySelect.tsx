import { useState } from 'react';
import { View, Text, Pressable, StyleSheet, PressableProps } from 'react-native';
import { ChevronDown } from 'lucide-react-native';

type CategoryOption = {
  id: number;
  label: string;
  value: string;
};

interface CategorySelectProps extends PressableProps {
  label: string;
  value?: number;
  placeholder?: string;
  options: CategoryOption[];
  error?: string;
  onChange: (id: number) => void;
}

export function CategorySelect({
  label,
  value,
  placeholder = 'Selecione uma categoria',
  options,
  disabled,
  error,
  onChange,
}: CategorySelectProps) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find(option => option.id === value);

  function handleSelect(option: CategoryOption) {
    onChange(option.id);
    setIsOpen(false);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        disabled={disabled}
        onPress={() => setIsOpen(prev => !prev)}
        style={({ pressed }) => [styles.input, pressed && { opacity: 0.7 }]}>
        <Text style={[styles.text, !selectedOption && styles.placeholder]}>
          {selectedOption?.label || placeholder}
        </Text>

        <ChevronDown size={16} color="#6D6059" />
      </Pressable>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map(option => {
            const isSelected = option.id === value;

            return (
              <Pressable
                key={option.id}
                onPress={() => handleSelect(option)}
                style={({ pressed }) => [
                  styles.option,
                  isSelected && styles.selectedOption,
                  pressed && { opacity: 0.6 },
                ]}>
                <Text style={[styles.optionText, isSelected && styles.selectedText]}>
                  {option.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      )}

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: 500,
  },
  input: {
    height: 40,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8DED4',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  text: {
    fontSize: 16,
    color: '#2A1F19',
  },
  placeholder: {
    color: '#8B817A',
  },

  dropdown: {
    marginTop: 8,
    borderRadius: 18,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#E8DED4',
    overflow: 'hidden',
  },

  option: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },

  selectedOption: {
    backgroundColor: '#E8A020',
  },

  optionText: {
    fontSize: 16,
    color: '#2A1F19',
  },

  selectedText: {
    color: '#000',
    fontWeight: '600',
  },

  error: {
    color: 'red',
    fontSize: 12,
  },
});
