# Como rodar o sistema

## Pré-requisitos

- Node.js instalado
- MySQL instalado e rodando
- Android Studio instalado
- JDK configurado
- Emulador Android ou celular físico com depuração USB ativada

---

## Backend

Entre na pasta do backend:

```bash
cd backend
```

### Instale as dependências:

```bash
npm install
```

### Crie o arquivo .env com base no .env.example:

```bash
PORT=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD=sua_senha
DATABASE_NAME=recipes_db
```

### Rode as migrations ou sincronize o banco, conforme a configuração do projeto.

Inicie o servidor:

```bash
npm run start:dev
```

A API ficará disponível em:

http://localhost:3000

## Frontend Mobile

### Entre na pasta do app:

```bash
cd mobile
```

### Instale as dependências:

```bash
npm install
```

### Instale as dependências nativas do Android:

```bash
cd android
gradlew clean
cd ..
```

### Inicie o Metro Bundler:

```bash
npm start
```

### Em outro terminal, rode o app no Android:

```bash
npm run android
```

### Gerar APK Android

## Entre na pasta Android:

```bash
cd mobile/android
```

### Gere o APK:

gradlew assembleRelease

O APK será gerado em:

mobile/android/app/build/outputs/apk/release/app-release.apk
Observação sobre API no Android

Se estiver usando emulador Android, a URL da API no app deve apontar para:

http://10.0.2.2:3000

Se estiver usando celular físico, use o IP da sua máquina na rede local, por exemplo:

http://192.168.0.10:3000
