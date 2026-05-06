import { Search } from 'lucide-react-native';
import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, TextInput, TextInputProps, View } from 'react-native';

export function SearchBar({ ...rest }: TextInputProps) {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => clearTimeout(timeout);
  }, [search]);

  useEffect(() => {
    if (debouncedSearch) {
      console.log('Buscar:', debouncedSearch);
      // chama API ou filtra lista aqui
    }
  }, [debouncedSearch]);

  function handleSearchRecipe() {
    console.log('buscando');
  }
  return (
    <View style={[styles.boxConatiner]}>
      <Pressable
        onPress={handleSearchRecipe}
        hitSlop={10}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}>
        <Search size={24} color="#000" />
      </Pressable>

      <TextInput
        placeholder={'Buscar receitas...'}
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        //   onFocus={() => setIsFocused(true)}
        //   onBlur={() => setIsFocused(false)}
        {...rest}
      />
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
    backgroundColor: '#ffffff',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EBE4D6',
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
