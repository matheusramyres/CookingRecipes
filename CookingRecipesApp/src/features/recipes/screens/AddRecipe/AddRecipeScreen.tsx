import { Screen } from '@/shared/components/layout/Screen';
import { Header } from '@/shared/components/ui/Header';
import { RecipeFormFields } from '../../components/RecipeFormFields';
import { RecipeFormData } from '../../types/RecipeFormData';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import { Button } from '@/shared/components/ui/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createRecipe } from '../../services/recipeService';

export function AddRecipeScreen() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<RecipeFormData>({
    mode: 'onChange',
    defaultValues: {
      name: '',
      categoryId: undefined,
      prepTimeMinutes: undefined,
      servings: undefined,
      ingredients: '',
      preparationMethod: '',
    },
  });

  const createRecipeMutation = useMutation({
    mutationFn: createRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigation.navigate('Home');
    },
  });

  function onSubmit(data: RecipeFormData) {
    createRecipeMutation.mutate({
      name: data.name,
      prepTimeMinutes: Number(data.prepTimeMinutes),
      servings: Number(data.servings),
      preparationMethod: data.preparationMethod,
      ingredients: data.ingredients,
      categoryId: Number(data.categoryId),
    });
  }

  return (
    <Screen>
      <Header title="Nova Receita" />

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
              textButton={createRecipeMutation.isPending ? 'Salvando...' : 'Salvar'}
              style={styles.button}
              onPress={handleSubmit(onSubmit)}
              disabled={!isValid || createRecipeMutation.isPending}
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
  containerButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 24,
  },
  button: {
    width: 158,
  },
});
