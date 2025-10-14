# 🛠️ Caminho do Código - Back-end

Bem-vindo ao **back-end** do projeto **Caminho do Código**, um guia para estudantes iniciantes na área de tecnologia com indicações de **cursos gratuitos**.  
Este back-end é responsável por **gerenciar os dados dos cursos**, permitindo que um **administrador (usuário)** adicione, edite e exclua conteúdos.

---

## 🚀 Tecnologias Utilizadas

- **Node.js** → Ambiente de execução JavaScript.  
- **TypeScript** → Superset do JavaScript com tipagem estática.  
- **Express.js** → Framework para criação da API REST.  
- **MongoDB Atlas** → Banco de dados NoSQL baseado em nuvem.  
- **Mongoose** → Modelagem de objetos para MongoDB.  
- **Bcrypt** → Hash seguro de senhas.  
- **JSON Web Token (JWT)** → Autenticação e controle de acesso.

---

## 🧩 Estrutura do Projeto

A aplicação segue uma **arquitetura de domínio**, onde cada camada possui responsabilidades bem definidas:

src/
├── config/ → Variáveis de ambiente e configurações

├── controllers/ → Lógica das requisições e respostas

├── database/ → Conexão com o MongoDB e repositórios

├── factories/ → Criação de instâncias dos modelos

├── models/ → Entidades do negócio (Admin, Course)

├── repositories/ → Interfaces para padronizar o acesso ao banco

├── routes/ → Definição dos endpoints da API

├── services/ → Regras de negócio

└── shared/ → Funções e middlewares (JWT, autenticação)

---

## ⚙️ Instalação e Configuração

## Acessando:

Siga estas instruções para ter uma cópia do projeto funcionando na sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Certifique-se de ter as seguintes ferramentas instaladas:

* **Node.js** (versão LTS recomendada)
* **npm** ou **Yarn** (gerenciador de pacotes)
* **TypeScript** (geralmente instalado junto com o Node.js ou via npm)
* **MongoDB Instance**: Uma instância do MongoDB (local ou na nuvem, como MongoDB Atlas) configurada e acessível. Você precisará de uma URI de conexão.

### Instalação

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/feliixjuliana/caminho-do-codigo.git
    ```
2.  **Navegue até o diretório do projeto:**
    ```bash
    cd caminho-do-codigo
    ```
3.  **Instale as dependências:**
    ```bash
    npm install
    ```
    
4.  **Configure as variáveis de ambiente:**
    Crie um arquivo `.env` na raiz do diretório e adicione a URI de conexão do seu MongoDB e uma chave secreta para o JWT:

    ```
      MONGO_URL = 
      MONGO_URI_TEST = 
      PORT=
      JWT_SECRET=
      NODE_ENV=
    ```

5.  **Execute o projeto:**
    ```bash
    npm run dev
    ```
    O servidor deverá iniciar, geralmente em `http://localhost:3000`.

---

## 🗺️ Endpoints da API
A API está organizada com o prefixo /api e utiliza as seguintes rotas. Para testá-las, você pode usar ferramentas como Insomnia ou Postman.

### Rotas de Autenticação (/api/admins)
POST /api/admins/register: Cria um novo administrador.

POST /api/admins/login: Realiza o login do administrador e retorna um token JWT.

GET /api/admins: Lista todos os administradores. (Requer autenticação)

GET /api/admins/:id: Busca um administrador por ID. (Requer autenticação)

### Rotas de Cursos (/api/courses)
GET /api/courses: Lista todos os cursos disponíveis.

GET /api/courses/:id: Busca um curso por ID.

POST /api/courses: Cria um novo curso. (Requer autenticação)

PATCH /api/courses/:id: Atualiza um curso existente. (Requer autenticação)

DELETE /api/courses/:id: Deleta um curso. (Requer autenticação)

---

## 🧾 Licença
Este projeto é distribuído sob a licença MIT.
Sinta-se à vontade para usar, modificar e contribuir com melhorias! 💜

---

👩‍💻 Autora
Desenvolvido com 💡 por Juliana Felix.
Se quiser contribuir, envie um Pull Request ou abra uma Issue! 🚀
