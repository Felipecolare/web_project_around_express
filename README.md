# Tripleten Web Project Around Express

## Descrição

O **Around Express** é uma aplicação web backend desenvolvida com Node.js e Express.js que fornece uma API REST para gerenciar usuários e cartões de uma rede social. O projeto permite aos usuários criar perfis, compartilhar cartões com imagens e interagir através de curtidas.

## Funcionalidades

### Usuários
- Criar novos usuários
- Listar todos os usuários
- Buscar usuário por ID
- Atualizar informações do perfil (nome e sobre)
- Atualizar avatar do usuário

### Cartões
- Criar novos cartões com imagens
- Listar todos os cartões
- Deletar cartões
- Curtir cartões
- Remover curtidas de cartões

## Tecnologias Utilizadas

- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web para Node.js
- **MongoDB** - Banco de dados NoSQL
- **Mongoose** - ODM (Object Data Modeling) para MongoDB
- **ESLint** - Ferramenta de linting para JavaScript
- **Nodemon** - Ferramenta para desenvolvimento que reinicia automaticamente o servidor

## Estrutura do Projeto

```
├── app.js                 # Arquivo principal da aplicação
├── package.json          # Dependências e scripts do projeto
├── models/              # Modelos do banco de dados
│   ├── user.js         # Modelo de usuário
│   └── card.js         # Modelo de cartão
├── routes/             # Rotas da API
│   ├── users.js       # Rotas de usuários
│   └── cards.js       # Rotas de cartões
├── controllers/        # Controladores da aplicação
│   ├── users.js       # Controlador de usuários
│   └── cards.js       # Controlador de cartões
└── public/            # Arquivos estáticos
```

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/Felipecolare/web_project_around_express.git
cd web_project_around_express
```

2. Instale as dependências:
```bash
npm install
```

3. Certifique-se de que o MongoDB está rodando na sua máquina na porta padrão (27017)

4. Inicie o servidor:
```bash
npm run dev  # Para desenvolvimento com nodemon
# ou
npm start    # Para produção
```

O servidor estará disponível em `http://localhost:3000`

## Endpoints da API

### Usuários
- `GET /users` - Lista todos os usuários
- `GET /users/:id` - Busca usuário por ID
- `POST /users` - Cria novo usuário
- `PATCH /users/me` - Atualiza perfil do usuário atual
- `PATCH /users/me/avatar` - Atualiza avatar do usuário atual

### Cartões
- `GET /cards` - Lista todos os cartões
- `POST /cards` - Cria novo cartão
- `DELETE /cards/:cardId` - Deleta cartão por ID
- `PUT /cards/:cardId/likes` - Adiciona curtida ao cartão
- `DELETE /cards/:cardId/likes` - Remove curtida do cartão

## Exemplo de Uso

### Criar um usuário:
```bash
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "about": "Desenvolvedor apaixonado por tecnologia",
    "avatar": "https://example.com/avatar.jpg"
  }'
```

### Criar um cartão:
```bash
curl -X POST http://localhost:3000/cards \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Paisagem incrível",
    "link": "https://example.com/image.jpg"
  }'
```

## Scripts Disponíveis

- `npm start` - Inicia o servidor em modo de produção
- `npm run dev` - Inicia o servidor em modo de desenvolvimento (com nodemon)
- `npm run lint` - Executa o linter ESLint
- `npm test` - Executa os testes (atualmente roda o app.js)

## Validações

O projeto inclui validações para:
- URLs válidas para avatares e links de imagens
- Comprimento mínimo e máximo para campos de texto
- Campos obrigatórios para criação de usuários e cartões

## Autor

**Felipe Colare**
- GitHub: [@Felipecolare](https://github.com/Felipecolare)

## Licença

Este projeto está sob a licença ISC.

---

*Projeto desenvolvido como parte do curso da Tripleten*
