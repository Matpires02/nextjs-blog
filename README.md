# 📌 The Blog

Aplicação web de blog desenvolvida com foco em performance e simplicidade, permitindo a visualização, criação, edição e exclusão de posts. O sistema conta com autenticação baseada em cookies utilizando JWT para controle de acesso às funcionalidades administrativas.

## 🚀 Funcionalidades

- Listagem de posts
- Visualização de post individual
- Criação de novos posts
- Edição de posts existentes
- Exclusão de posts
- Upload e exibição de imagens
- Autenticação de usuário
- Proteção de rotas (acesso restrito para criação/edição)
- Dark Mode

## 🛠️ Tecnologias

- **Frontend / Backend:** Next.js (App Router)
- **Estilização:** Tailwind CSS
- **Banco de Dados:** SQLite
- **Autenticação:** JWT armazenado em cookies HTTP-only

## ⚙️ Como executar o projeto

```bash
# Clonar o repositório
git clone https://github.com/Matpires02/nextjs-blog

# Acessar a pasta
cd nextjs-blog

# Instalar dependências
npm install

# Configurar variáveis de ambiente
cp .env.local-example .env.local

# Rodar migrations (caso utilize ORM como Prisma)
npm run migrate
npm run seed # Seed é opcional

# Executar o projeto
npm run dev

Abra [http://localhost:3000](http://localhost:3000) no navegador para ver o resultado.

## 🔐 Autenticação

A autenticação é baseada em JWT (JSON Web Token) armazenado em cookies HTTP-only, garantindo maior segurança contra ataques como XSS.

- Login gera um token JWT assinado
- Token é armazenado em cookie seguro
- Middleware (Proxy) valida o token em rotas protegidas
- Usuário autenticado podem criar, editar e excluir posts

## 📌 Rotas

Path / # Lista todos os posts
Path /post/:slug # Retorna um post específico
Path /admin/post # Lista todos os posts (autenticado)
Path /admin/posts/:id # Atualiza um post (autenticado)
Path /admin/login # Autenticação do usuário

## 📈 Possíveis melhorias

- Sistema de comentários
- Upload de imagens com storage externo (S3, Cloudinary)
- Gerenciamento de usuários
- Autenticação de multiplos usuários
- Testes automatizados (unitários e e2e)
- SEO otimizado com metadata dinâmica
```
