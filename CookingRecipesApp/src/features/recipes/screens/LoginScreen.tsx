import logo from '@/assets/images/logo.png';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Screen } from '../../../shared/components/layout/Screen';

export function LoginScreen() {
  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View style={styles.contentInfo}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Minhas Receitas</Text>
            <Text style={styles.description}>Organize suas receitas favoritas em um só lugar</Text>
          </View>

          <View style={styles.containerForm}>
            <Text style={styles.textContainerForm}>Entrar</Text>
            <Input label="Login" placeholder="Digite seu login" />
            <Input variation="password" label="Senha" placeholder="Digite sua senha" />
            <Button textButton="Entrar" style={styles.enterButton} />

            <View style={styles.textContainer}>
              <Text style={styles.textAsk}>Não tem uma conta?</Text>
              <Pressable
                style={({ pressed }) => ({
                  opacity: pressed ? 0.5 : 1,
                })}>
                <Text style={styles.textCreateAccount}>Criar conta</Text>
              </Pressable>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBF8F1',
  },
  logo: {
    marginTop: 54,
    width: 100,
    height: 100,
  },
  contentInfo: {
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#2A1F19',
    marginTop: 24,
  },
  description: {
    fontWeight: 'regular',
    fontSize: 14,
    color: '#6D6059',
    marginTop: 8,
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 86,
    paddingInline: 24,
    paddingTop: 32,
  },
  textContainerForm: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2A1F19',
  },
  enterButton: {
    marginTop: 32,
  },
  textContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    marginTop: 28,
  },
  textAsk: {
    fontSize: 14,
    marginRight: 5,
  },
  textCreateAccount: {
    fontSize: 14,
    fontWeight: 'semibold',
    color: '#E46212',
  },
});
