import { RootStackParamList } from '@/navigation/types';
import { ReturnButton } from '@/shared/components/ui/ReturnButton';
import { RoundButton } from '@/shared/components/ui/RoundButton';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StyleSheet, View } from 'react-native';

interface HeaderRecipeDetailsProps {
  id: Number;
  onDelete: () => void;
}

export function HeaderRecipeDetails({ id, onDelete }: HeaderRecipeDetailsProps) {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <ReturnButton />
        <View style={styles.containerActions}>
          <RoundButton
            icon={'pen'}
            onPress={() => navigation.navigate('EditRecipe', { recipeId: Number(id) })}
          />
          <RoundButton icon={'trash'} onPress={onDelete} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E46212',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 60,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  containerActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
