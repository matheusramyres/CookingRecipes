import { Screen } from '@/shared/components/layout/Screen';
import { Header } from '@/shared/components/ui/Header';
import { Button } from '@/shared/components/ui/Button';
import { RootStackParamList } from '@/navigation/types';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from 'react-native';
import { RecipeFormFields } from '../../components/RecipeFormFields';
import { RecipeFormData } from '../../types/RecipeFormData';
import { useForm } from 'react-hook-form';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getRecipeById, updateRecipe } from '../../services/recipeService';
import { useEffect } from 'react';

type Props = NativeStackScreenProps<RootStackParamList, 'EditRecipe'>;

export function EditRecipeScreen({ route, navigation }: Props) {
  const recipeId = route.params.recipeId;
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { isValid },
  } = useForm<RecipeFormData>({
    mode: 'onChange',
  });

  const { data: recipe, isLoading } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  });

  useEffect(() => {
    if (recipe) {
      reset({
        name: recipe.name,
        categoryId: recipe.category?.id,
        prepTimeMinutes: recipe.prepTimeMinutes,
        servings: recipe.servings,
        ingredients: recipe.ingredients ?? '',
        preparationMethod: recipe.preparationMethod,
      });
    }
  }, [recipe, reset]);

  const updateRecipeMutation = useMutation({
    mutationFn: (data: RecipeFormData) =>
      updateRecipe(recipeId, {
        name: data.name,
        prepTimeMinutes: Number(data.prepTimeMinutes),
        servings: Number(data.servings),
        preparationMethod: data.preparationMethod,
        ingredients: data.ingredients,
        categoryId: Number(data.categoryId),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      queryClient.invalidateQueries({ queryKey: ['recipe', recipeId] });
      navigation.navigate('Home');
    },
  });

  function onSubmit(data: RecipeFormData) {
    updateRecipeMutation.mutate(data);
  }

  if (isLoading) {
    return (
      <Screen>
        <Header title="Editar Receita" />
        <Text style={styles.message}>Carregando receita...</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <Header title="Editar Receita" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <RecipeFormFields control={control} />

          <View style={styles.containerButton}>
            <Button
              textButton="Cancelar"
              variant="secondary"
              style={styles.button}
              onPress={() => navigation.goBack()}
            />

            <Button
              textButton={updateRecipeMutation.isPending ? 'Salvando...' : 'Salvar'}
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || updateRecipeMutation.isPending}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
    paddingBottom: 30,
  },
  message: {
    padding: 16,
    color: '#2A1F19',
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  button: {
    width: 158,
  },
});
