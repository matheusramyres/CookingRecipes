import { StyleSheet, Text, View, Pressable } from 'react-native';
import { Clock, Users, UtensilsCrossed } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/navigation/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type Props = {
  id: number;
  title: string;
  description?: string;
  category?: string;
  prepTimeMinutes: number;
  servings: number;
};

export function RecipeCard({ id, title, category, prepTimeMinutes, servings }: Props) {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();
  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate('RecipeDetails', { recipeId: id })}>
      <View style={styles.imageContainer}>
        <UtensilsCrossed size={40} color={'#E46212'} />
      </View>

      <View style={styles.recipeContainer}>
        <Text style={styles.recipeCategory}>{category || 'Sem categoria'}</Text>

        <Text style={styles.recipeName}>{title}</Text>

        <View style={styles.recipDetails}>
          <View style={styles.contentTime}>
            <Clock size={14} color={'#6D6059'} />
            <Text style={styles.textTime}>{prepTimeMinutes} min</Text>
          </View>

          <View style={styles.contentPortion}>
            <Users size={14} color={'#6D6059'} />
            <Text style={styles.textPortion}>{servings} porções</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    gap: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  imageContainer: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    backgroundColor: '#F8E2BD',
  },
  recipeContainer: {},
  recipeCategory: {
    fontSize: 12,
    fontWeight: 500,
    color: '#E46212',
  },
  recipeName: {
    fontSize: 16,
    fontWeight: 600,
    color: '#2A1F19',
  },
  recipDetails: {
    flexDirection: 'row',
    marginTop: 10,
    gap: 16,
  },
  contentTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textTime: {},
  contentPortion: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  textPortion: {},
});
