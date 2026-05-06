import logo from '@/assets/images/logo.png';
import { Screen } from '@/shared/components/layout/Screen';
import { Button } from '@/shared/components/ui/Button';
import { Input } from '@/shared/components/ui/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
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
import { LoginForm, loginSchema } from '../../schemas/SchemaLogin';
import { api } from '@/shared/services/api';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '../../store/useAuthStore';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';

export function LoginScreen() {
  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      login: '',
      password: '',
    },
    mode: 'onChange',
  });

  const signIn = useAuthStore(state => state.signIn);

  const loginMutation = useMutation({
    mutationFn: async (data: LoginForm) => {
      const response = await api.post('/auth/login', {
        login: data.login,
        password: data.password,
      });

      return response.data;
    },
    onSuccess: data => {
      signIn(data.accessToken, data.user);
      navigation.replace('Home');
    },
    onError: error => {
      console.log('====ERRO NO LOGIN:', error);
    },
  });

  async function onSubmit(data: LoginForm) {
    loginMutation.mutate(data);
  }

  function onInvalid(errors: any) {
    console.log('ERROS:', errors);
  }

  return (
    <Screen>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView contentContainerStyle={styles.scrollView} keyboardShouldPersistTaps="handled">
          <View style={styles.contentInfo}>
            <Image source={logo} style={styles.logo} />
            <Text style={styles.title}>Minhas Receitas</Text>
            <Text style={styles.description}>Organize suas receitas favoritas em um só lugar</Text>
          </View>

          <View style={styles.containerForm}>
            <Text style={styles.textContainerForm}>Entrar</Text>

            <Controller
              control={control}
              name="login"
              render={({ field, fieldState }) => (
                <Input
                  label="Login"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  placeholder="Digite seu login"
                />
              )}
            />

            <Controller
              control={control}
              name="password"
              render={({ field, fieldState }) => (
                <Input
                  variation="password"
                  label="Senha"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  placeholder="Digite sua senha"
                />
              )}
            />

            <Button
              textButton={loginMutation.isPending ? 'Entrando...' : 'Entrar'}
              style={styles.enterButton}
              disabled={!isValid || loginMutation.isPending}
              onPress={handleSubmit(onSubmit, onInvalid)}
            />

            <View style={styles.textContainer}>
              <Text style={styles.textAsk}>Não tem uma conta?</Text>
              <Pressable
                onPress={() => console.log('Próxima pagina')}
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
  },
  scrollView: {
    flexGrow: 1,
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
    fontWeight: 400,
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
    paddingHorizontal: 24,
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
    fontWeight: 600,
    color: '#E46212',
  },
});
