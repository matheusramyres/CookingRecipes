# Como rodar o sistema

## Pré-requisitos

- Node.js instalado versão 22.20.0
- Yarn instalado
- Docker instalado
- Android Studio instalado
- JDK configurado
- Emulador Android ou celular físico com depuração USB ativada

---

## Backend

### Na raiz da pasta CookingRecipes

```bash

docker compose up -d

```

### Entre na pasta do backend cooking-recips-back

```bash
cd cooking-recips-back
```
### Instale as dependências:

```bash
yarn install
```

### Na raiz do cooking-recips-back, crie o arquivo .env:

```bash
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=teste_receitas_rg_sistemas
JWT_SECRET=receitas_secret_key
```

### Rode as migrations ou sincronize o banco, conforme a configuração do projeto.

Inicie o servidor:

```bash
yarn start:dev
```

### A API ficará disponível em:

http://localhost:3000

## Frontend Mobile

### Entre na pasta do app:

```bash
cd CookingRecipesApp
```

### Instale as dependências:

```bash
yarn install
```

### Instale as dependências nativas do Android:

```bash
cd android
gradlew clean
cd ..
```

### Inicie o Metro Bundler:

```bash
yarn start
```

### Em outro terminal, rode o app no Android:

```bash
yarn android
```

### Gerar APK Android

## Entre na pasta Android:

```bash
cd CookingRecipesApp/android
```

### Gere o APK:

gradlew assembleRelease

O APK será gerado em:

CookingRecipesApp/android/app/build/outputs/apk/release/app-release.apk
Observação sobre API no Android

Se estiver usando emulador Android, a URL da API no app deve apontar para:

http://10.0.2.2:3000

Se estiver usando celular físico, use o IP da sua máquina na rede local, por exemplo:

http://192.168.0.10:3000
