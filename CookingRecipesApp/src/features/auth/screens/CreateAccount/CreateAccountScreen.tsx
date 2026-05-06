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
import { CreateAccountForm, schemaCreateAccount } from '../../schemas/SchemaCreateAccount';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/types';
import { Header } from '@/shared/components/ui/Header';

export function CreateAccountScreen() {
  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(schemaCreateAccount),
    defaultValues: {
      name: '',
      login: '',
      password: '',
    },
    mode: 'onChange',
  });

  function onSubmit(data: CreateAccountForm) {
    console.log('SUCESSO:', data);
  }

  function onInvalid(errors: any) {
    console.log('ERROS:', errors);
  }

  type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<NavigationProps>();

  return (
    <Screen>
      <Header title="Voltar" variant="secondary" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scrollViewStyle}
          keyboardShouldPersistTaps="handled">
          <View style={styles.contentInfo}>
            <Image source={logo} style={styles.logo} />
            <View>
              <Text style={styles.title}>Criar Conta</Text>
              <Text style={styles.description}>Preencha os dados abaixo</Text>
            </View>
          </View>

          <View style={styles.containerForm}>
            <Controller
              control={control}
              name="name"
              render={({ field, fieldState }) => (
                <Input
                  label="Nome completo"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  placeholder="Digite seu nome"
                />
              )}
            />

            <Controller
              control={control}
              name="login"
              render={({ field, fieldState }) => (
                <Input
                  label="Login"
                  value={field.value}
                  onChangeText={field.onChange}
                  errorMessage={fieldState.error?.message}
                  placeholder="Escolha um login"
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
              textButton="Criar conta"
              style={styles.enterButton}
              onPress={handleSubmit(onSubmit, onInvalid)}
              disabled={!isValid}
            />
          </View>
        </ScrollView>
        <View style={styles.textContainer}>
          <Text style={styles.textAsk}>Já tem uma conta?</Text>
          <Pressable
            onPress={() => navigation.navigate('Login')}
            style={({ pressed }) => ({
              opacity: pressed ? 0.5 : 1,
            })}>
            <Text style={styles.link}>Entrar</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  scrollViewStyle: {
    flexGrow: 1,
  },
  logo: {
    width: 66,
    height: 66,
  },
  contentInfo: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#2A1F19',
  },
  description: {
    fontWeight: 400,
    fontSize: 14,
    color: '#6D6059',
  },
  containerForm: {},
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
    alignItems: 'center',
    flexDirection: 'row',
    padding: 18,
  },
  textAsk: {
    fontSize: 14,
    marginRight: 5,
  },
  link: {
    fontSize: 14,
    fontWeight: 600,
    color: '#E46212',
  },
});
