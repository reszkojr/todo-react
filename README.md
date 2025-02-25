
# Todo React

Este é o frontend do projeto Todo, desenvolvido com React, Typescript, React Router e Tailwind.

## Conceitos e Decisões Técnicas

### Tecnologias Utilizadas

- **React**: Biblioteca JavaScript (neste caso, Typescript) para construção de interfaces de usuário.
- **Tailwind CSS**: Framework CSS criado para estilização rápida e eficiente.
- **React Hook Form**: Biblioteca para gerenciamento de formulários em React.
- **Axios**: Cliente HTTP para realizar requisições à API backend.
- **React Router**: Biblioteca para gerenciamento de rotas no React.
- **Headless UI**: Componentes UI acessíveis e sem estilo para React.
- **Dnd-kit**: Biblioteca para implementar funcionalidades de arrastar e soltar (drag and drop).

### Estrutura do Projeto

- **app/components**: Componentes reutilizáveis do React.
- **app/contexts**: Contextos do React para gerenciamento de estado global.
- **app/routes**: Componentes de página e rotas do React Router.
- **app/services**: Serviços para comunicação com a API backend.
- **app/types**: Tipos utilizados pela aplicação.

### Decisões Técnicas

- **Tailwind CSS** foi escolhido para permitir estilização rápida e consistente, utilizando classes utilitárias;
- **React Hook Form** foi escolhido para simplificar o gerenciamento de formulários e validação;
- **Axios** foi escolhido pela sua simplicidade e suporte a promessas para realizar requisições HTTP;
- **React Router** foi escolhido para gerenciar a navegação entre páginas de forma eficiente.
- **Headless UI** foi escolhido para fornecer a funcionalidade modal na criação de Todos;
- **Dnd-kit** foi escolhido para implementar funcionalidades de *drag and drop* de forma acessível e bonitinha.

## Configuração do Projeto

### Requisitos

- Node.js (versão 20 ou superior)
- npm ou pnpm
- API backend rodando na porta 3000 (siga as instruções em [todo-express](https://github.com/reszkojr/todo-express?tab=readme-ov-file#configura%C3%A7%C3%A3o-do-projeto))

### Configuração Local

1. Clone o repositório:

```bash
git clone https://github.com/reszkojr/todo-react.git
cd todo-react
```

2. Instale as dependências:

```bash
pnpm install
```

3. Inicie o servidor de desenvolvimento:

```bash
pnpm run dev
```

O aplicativo estará disponível em `http://localhost:5173`.

### Configuração com Docker

1. Clone o repositório:

```bash
git clone https://github.com/reszkojr/todo-react.git
cd todo-react
```

2. Realize o build na imagem Docker:

```bash
docker build -t todo-react .
```

3. Execute o container:

```bash
docker run -p 5173:5173 todo-react
```

O aplicativo estará disponível em `http://localhost:5173`.

## Estrutura de Diretórios

```plaintext
todo-react/
├── public/                 # Arquivos públicos
├── app/
│   ├── components/         # Componentes reutilizáveis
│   ├── contexts/           # Contextos do React
│   ├── routes/             # Componentes de página e rotas
│   ├── services/           # Serviços para comunicação com a API
│   ├── types/              # Tipos
│   ├── App.tsx             # Componente principal do aplicativo
│   ├── index.tsx           # Ponto de entrada do React
├── .dockerignore           # Arquivos e diretórios ignorados pelo Docker
├── Dockerfile              # Configuração do Docker
├── package.json            # Dependências e scripts do projeto
├── pnpm-lock.yaml          # Arquivo de bloqueio do pnpm
├── tailwind.config.js      # Configuração do Tailwind
├── tsconfig.json           # Configuração do TypeScript
```