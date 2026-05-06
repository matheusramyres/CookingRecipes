import { RoundButton } from '@/shared/components/ui/RoundButton';
import { StyleSheet, Text, View } from 'react-native';
import { SearchBar } from './SearchBar';
import Logo from '@/assets/images/userDefault.svg';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export function HeaderHome() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();
  const signOut = useAuthStore(state => state.signOut);

  function handleLogout() {
    signOut();
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' as never }],
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.headerTop}>
        <View style={styles.userContent}>
          <View style={styles.avatarContainer}>
            <Logo width={30} height={30} />
          </View>

          <View style={styles.userTextContent}>
            <Text style={styles.helloText}>Olá,</Text>
            <Text style={styles.userNameText}>Matheus Ramyres</Text>
          </View>
        </View>
        <RoundButton icon={'exit'} onPress={() => handleLogout} />
      </View>

      <View style={styles.headerBottom}>
        <Text style={styles.myRecips}>Minhas Receitas</Text>
        <SearchBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#E46212',
    paddingTop: 16,
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  userContent: {
    flexDirection: 'row',
  },
  avatarContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255, 0.2)',
  },
  userTextContent: {
    gap: 5,
    marginLeft: 15,
  },
  helloText: {
    fontSize: 14,
    color: '#F7D0B7',
  },
  userNameText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#ffffff',
  },
  headerBottom: {
    marginTop: 16,
  },
  myRecips: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
