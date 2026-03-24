# Sistema CRUD de Agenda Online Full-Stack

Este projeto é uma aplicação web completa para gerenciamento de tarefas. Ele nasceu como um exercício de lógica e evoluiu para uma estrutura Full Stack, integrando uma interface reativa em React com um servidor BackEnd Supabase baseado em PostgreSQL.

# O que faz?

-- Você pode criar, ler, editar e excluir lembretes em tempo real. 
-- Diferente de uma lista local, aqui os dados são salvos em um banco de dados PostgreSQL via Supabase.
-- O sistema organiza automaticamente as tarefas por dia, facilitando a visualização da agenda.
-- Uso de Zod para garantir que você não salve datas no passado ou campos vazios.

# Tecnologias utilizadas

## Frontend

React (Vite): Para uma interface rápida e componentes reutilizáveis.
React Hook Form & Zod: Gerenciamento de formulários e validação de dados.
CSS Modules: Estilização isolada por componente para evitar conflitos de estilo.

## Backend & Banco de Dados

PostgreSQL (Supabase): Banco de dados relacional para armazenamento seguro dos lembretes.
CreateClient(): Para conexão direta com banco de dados, abstraindo códigos backend;

## Instruções para Execução

Para rodar esta aplicação, você precisará de dois terminais abertos simultaneamente.

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/j040lop3s/CRUD-agenda-fullstack-project.git

2. **Instale as dependências:**
   ```bash
   npm install

3. **Coloque para rodar:**
   ```bash
   npm run dev


# Comentários:

Durante o desenvolvimento, priorizei a separação de responsabilidades. O Frontend cuida da experiência do usuário (UX), enquanto o Backend valida as regras de negócio e garante a integridade dos dados no banco.

*Arquivos de código possuem comentários detalhando o funcionamento de cada componente.


