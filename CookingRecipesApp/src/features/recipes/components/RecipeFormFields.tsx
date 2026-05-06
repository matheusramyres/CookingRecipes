import { Input } from '@/shared/components/ui/Input';
import { Control, Controller } from 'react-hook-form';
import { StyleSheet, View } from 'react-native';
import { RecipeFormData } from '../types/RecipeFormData';
import { CategorySelect } from './CategorySelect';
import { TextArea } from '@/shared/components/ui/TextArea';

type RecipeFormFieldsProps = {
  control: Control<RecipeFormData>;
  isReadOnly?: boolean;
};

export function RecipeFormFields({ control, isReadOnly = false }: RecipeFormFieldsProps) {
  const categories = [
    { id: 1, label: 'Bolos e tortas doces', value: 'Bolos e tortas doces' },
    { id: 2, label: 'Carnes', value: 'Carnes' },
    { id: 3, label: 'Aves', value: 'Aves' },
    { id: 4, label: 'Peixes e frutos do mar', value: 'Peixes e frutos do mar' },
    {
      id: 5,
      label: 'Saladas, molhos e acompanhamentos',
      value: 'Saladas, molhos e acompanhamentos',
    },
    { id: 6, label: 'Sopas', value: 'Sopas' },
    { id: 7, label: 'Massas', value: 'Massas' },
    { id: 8, label: 'Bebidas', value: 'Bebidas' },
    { id: 9, label: 'Doces e sobremesas', value: 'Doces e sobremesas' },
    { id: 10, label: 'Lanches', value: 'Lanches' },
    { id: 11, label: 'Prato Único', value: 'Prato Único' },
    { id: 12, label: 'Light', value: 'Light' },
    { id: 13, label: 'Alimentação Saudável', value: 'Alimentação Saudável' },
  ];
  return (
    <>
      <Controller
        control={control}
        name="name"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <Input
            label="Nome da receita"
            placeholder="Ex: Bolo de chocolate"
            value={value}
            background="secondary"
            onChangeText={onChange}
            errorMessage={error?.message}
            editable={!isReadOnly}
          />
        )}
      />

      <Controller
        control={control}
        name="categoryId"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <CategorySelect
            label="Categoria"
            value={Number(value)}
            options={categories}
            onChange={onChange}
            disabled={isReadOnly}
            error={error?.message}
          />
        )}
      />

      <View style={styles.recipeMetaContainer}>
        <View style={styles.recipeMetaItem}>
          <Controller
            control={control}
            name="prepTimeMinutes"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                label="Tempo (min)"
                value={String(value ?? '')}
                background="secondary"
                onChangeText={onChange}
                errorMessage={error?.message}
                keyboardType="numeric"
                placeholder="30"
                editable={!isReadOnly}
              />
            )}
          />
        </View>

        <View style={styles.recipeMetaItem}>
          <Controller
            control={control}
            name="servings"
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Input
                label="Porções"
                value={String(value ?? '')}
                background="secondary"
                onChangeText={onChange}
                errorMessage={error?.message}
                keyboardType="numeric"
                placeholder="4"
                editable={!isReadOnly}
              />
            )}
          />
        </View>
      </View>

      <Controller
        control={control}
        name="ingredients"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextArea
            label="Ingredientes"
            value={value}
            background="secondary"
            onChangeText={onChange}
            errorMessage={error?.message}
            placeholder="Liste os ingredientes (um por linha)"
            editable={!isReadOnly}
            numberOfLines={5}
          />
        )}
      />

      <Controller
        control={control}
        name="preparationMethod"
        render={({ field: { value, onChange }, fieldState: { error } }) => (
          <TextArea
            label="Modo de preparo"
            value={value}
            background="secondary"
            onChangeText={onChange}
            errorMessage={error?.message}
            placeholder="Descreva o passo a passo"
            editable={!isReadOnly}
            numberOfLines={6}
          />
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  recipeMetaItem: {
    flex: 1,
  },
});
