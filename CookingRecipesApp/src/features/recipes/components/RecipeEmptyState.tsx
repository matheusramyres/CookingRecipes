import { StyleSheet, Text, View } from 'react-native';
import { UtensilsCrossed } from 'lucide-react-native';

export function RecipeEmptyState() {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <UtensilsCrossed size={48} color="#E46212" />
      </View>

      <Text style={styles.title}>Nenhuma receita cadastrada</Text>

      <Text style={styles.description}>Toque no botão + para adicionar sua primeira receita.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 80,
    alignItems: 'center',
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#F8E2BD',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#2A1F19',
    marginBottom: 8,
    textAlign: 'center',
  },
  description: {
    fontSize: 14,
    color: '#6D6059',
    textAlign: 'center',
    lineHeight: 20,
  },
});
