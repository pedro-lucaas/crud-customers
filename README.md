# Projeto Monorepo: CRUD de Clientes

Este projeto é um monorepo que contém tanto o backend quanto o frontend de um CRUD de clientes. O backend é construído em NestJS, enquanto o frontend é construído em HTML, Bootstrap e jQuery.

## Pré-requisitos

Antes de iniciar, certifique-se de que os seguintes softwares estejam instalados em sua máquina:

- Node.js (versão 14 ou superior)
- npm ou yarn

## Instalação

Para instalar o projeto, basta clonar este repositório em sua máquina:

```
git clone https://github.com/pedro-lucaas/crud-customers.git
```

## Executando o projeto localmente

Para executar o projeto localmente, é necessário rodar tanto o backend quanto o frontend.

### Backend

Para rodar o backend, navegue até o diretório do servidor e instale as dependências:

```
cd server
npm install
```

Em seguida, execute o comando>

```
npm run start:dev
```

### Frontend

Para rodar o frontend, basta abrir o arquivo `index.html` em um navegador web.

## CI/CD

Este projeto utiliza o GitHub Actions para realizar o CI/CD do backend e do frontend.

### Backend

O arquivo `cloud-run-deploy.yml` contém a configuração do GitHub Actions para realizar o deploy do backend no Google Cloud Run. Para utilizar este arquivo, basta adicionar as seguintes variáveis de ambiente secretas no repositório:

- `GCP_PROJECT_ID`: o ID do projeto previamente criado no Google Cloud Platform
- `GCP_EMAIL`: o email da conta de serviço com as permissões necessárias
- `GCP_CREDENTIALS`: as credenciais da conta de serviço em formato JSON
- `GCP_APP_NAME`: um nome de sua escolha para o serviço que sera criado no Cloud run

Com isso, o GitHub Actions irá executar o deploy do backend automaticamente sempre que houver uma nova versão na branch principal do repositório.

### Frontend

O arquivo `firebase-hosting-merge.yml` contém a configuração do GitHub Actions para realizar o deploy do frontend no Firebase Hosting. Para utilizar este arquivo, basta seguir os seguintes passos:

1. Crie um projeto no Firebase Console
2. Instale a CLI do Firebase (`npm install -g firebase-tools`)
3. Autentique-se no Firebase (`firebase login`)
4. Na raiz do projeto, execute `firebase init` para configurar o projeto com o Firebase Hosting
6. Escolha a opção de Hosting e selecione o projeto que você criou no passo 1
7. Configure seu repositorio "username/repo-name"
10. Escolha a opção "No" para não configurar um novo workflow

Com isso, foi criado um secrets no seu repositorio, e a partir de agora o GitHub Actions irá executar o deploy do frontend automaticamente sempre que houver uma nova versão na branch principal do repositório.

## Deploy

O deploy do backend é realizado através do Google Cloud Run e o deploy do frontend é realizado através do Firebase Hosting. Certifique-se de que as variáveis de ambiente secretas estejam configuradas corretamente para que o deploy seja executado com sucesso.

### Link de exemplo 
app: https://crud-customers-386317.web.app/
