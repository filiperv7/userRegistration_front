# User Registration

Esta é uma aplicação React e TypeScript; também utilizei Tailwind CSS, Axios, Formik, Yup e Zustand para o gerenciamento de estado.

#### Aqui está o [Back-end](https://github.com/filiperv7/userRegistration_back) desta aplicação.

## Nesta app você pode:
- visualizar lista de usuário cadastrados;
- criar contas (se for Admin);
- editar contas (se for Admin);
- excluir contas (se for Admin).

## Regras de negócio
1. Somente o Perfil "Admin" pode cadastrar um usuário.
2. O usuário de Perfil "Admin" pode editar as informaçãoes pessoais de qualquer usuário.
3. O usuário do perfil "User" só pode logar e ver lista de usuários

## Informação para primeiro login
Existe um usuário padrão que é criado ao atualizar o banco de dados usando o EF (passo 4).
CPF: 91649430035, Senha: $enHa32!

## Como rodar a aplicação (4 passos)
##### 1. Clone o projeto
```bash
git clone https://github.com/filiperv7/userRegistration_front
```

##### 2. Acesse a pasta do projeto
```bash
cd userRegistration_front
```

##### 3. Faça a instalação dos pacotes

```bash
npm install
```

##### 4. Variaveis de ambiente
Coloque o valor do link inicial da API .NET no arquivo .env

Por exemplo: ``VITE_API_URL=https://localhost:7160/api/User``

##### 5. Rode a aplicação

```bash
npm run dev
```

##### E pronto! A aplicação já está rodando
Agora é só acessar http://localhost:5173/ e, desde que a aplicação back-end também esteja de pé, você vai conseguir fazer login.

##### Obs.: para uma experiência completa, não deixe de rodar também o [Back-end](https://github.com/filiperv7/userRegistration_back)
