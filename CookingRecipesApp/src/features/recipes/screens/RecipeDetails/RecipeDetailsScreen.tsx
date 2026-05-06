import { RootStackParamList } from '@/navigation/types';
import { Screen } from '@/shared/components/layout/Screen';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Clock, Users, UtensilsCrossed } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { deleteRecipe, getRecipeById } from '../../services/recipeService';
import { HeaderRecipeDetails } from './components/HeaderRecipeDetails';

type Props = NativeStackScreenProps<RootStackParamList, 'RecipeDetails'>;

export function RecipeDetailsScreen({ route, navigation }: Props) {
  const recipeId = route.params.recipeId;
  const queryClient = useQueryClient();

  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['recipe', recipeId],
    queryFn: () => getRecipeById(recipeId),
  });

  const deleteRecipeMutation = useMutation({
    mutationFn: deleteRecipe,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipes'] });
      navigation.navigate('Home');
    },
  });

  function handleDelete() {
    deleteRecipeMutation.mutate(recipeId);
  }

  if (isLoading) {
    return (
      <Screen>
        <HeaderRecipeDetails id={recipeId} onDelete={handleDelete} />
        <Text style={styles.message}>Carregando receita...</Text>
      </Screen>
    );
  }

  if (isError || !recipe) {
    return (
      <Screen>
        <HeaderRecipeDetails id={recipeId} onDelete={handleDelete} />
        <Text style={styles.message}>Erro ao carregar receita.</Text>
      </Screen>
    );
  }

  return (
    <Screen>
      <HeaderRecipeDetails id={recipe.id} onDelete={handleDelete} />

      <View style={styles.imageContainer}>
        <View style={styles.imageContent}>
          <UtensilsCrossed size={40} color="#E46212" />
        </View>
      </View>

      <ScrollView style={styles.container}>
        <Text style={styles.textCategory}>{recipe.category?.name ?? 'Sem categoria'}</Text>
        <Text style={styles.recipeName}>{recipe.name}</Text>

        <View style={styles.recipeMetaContainer}>
          <View style={styles.recipeMeta}>
            <View style={styles.containerIcon}>
              <Clock size={20} color="#E46212" />
            </View>
            <Text style={styles.textQuantity}>{recipe.prepTimeMinutes ?? 0} min</Text>
            <Text style={styles.textDescription}>Preparo</Text>
          </View>

          <View style={styles.recipeMeta}>
            <View style={styles.containerIcon}>
              <Users size={20} color="#E46212" />
            </View>
            <Text style={styles.textQuantity}>{recipe.servings ?? 0}</Text>
            <Text style={styles.textDescription}>Porções</Text>
          </View>
        </View>

        <View style={styles.containerCard}>
          <Text style={styles.titleCard}>Ingredientes</Text>
          <View style={styles.card}>
            <Text style={styles.item}>{recipe.ingredients || 'Nenhum ingrediente informado.'}</Text>
          </View>
        </View>

        <View style={styles.containerCard}>
          <Text style={styles.titleCard}>Modo de preparo</Text>
          <View style={styles.card}>
            <Text style={styles.item}>{recipe.preparationMethod}</Text>
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  message: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    color: '#2A1F19',
    fontSize: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 60,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 90,
    zIndex: 9999,
  },
  imageContent: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F8E2BD',
  },
  textCategory: {
    textAlign: 'center',
    color: '#E46212',
    fontSize: 12,
    fontWeight: 500,
    marginBottom: 10,
  },
  recipeName: {
    color: '#2A1F19',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  recipeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 32,
    marginBottom: 30,
    marginTop: 24,
  },
  recipeMeta: {
    justifyContent: 'center',
    alignItems: 'center',
    color: '#2A1F19',
    fontSize: 20,
    fontWeight: 'bold',
  },
  containerIcon: {
    width: 50,
    height: 50,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1E3C7',
    marginBottom: 10,
  },
  textQuantity: {
    color: '#2A1F19',
    fontSize: 14,
    fontWeight: 600,
  },
  textDescription: {
    color: '#6D6059',
    fontSize: 12,
  },
  containerCard: {
    marginTop: 24,
  },
  titleCard: {
    color: '#2A1F19',
    fontSize: 18,
    fontWeight: 600,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    padding: 16,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  item: {
    fontSize: 14,
    color: '#2A1F19',
    marginBottom: 5,
    lineHeight: 22,
  },
});
