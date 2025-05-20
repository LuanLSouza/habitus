# Habitus - Aplicativo de Gerenciamento de Hábitos

Este é um aplicativo desenvolvido com Ionic e Angular para gerenciamento de hábitos, objetivos, categorias e conquistas.

## Páginas e Componentes

### 1. Página de Hábitos (`/habitos`)
**Componentes Ionic Utilizados:**
- `ion-content`: Container principal da página
- `ion-grid`, `ion-row`, `ion-col`: Sistema de grid para organização do layout
- `ion-card`: Cards para exibição dos hábitos
- `ion-fab`: Botão flutuante para adicionar novos hábitos
- `ion-fab-button`: Botão dentro do FAB
- `ion-icon`: Ícones para ações e status

**Funcionalidades:**
- Listagem de hábitos
- Adição de novos hábitos
- Edição de hábitos existentes
- Exclusão de hábitos
- Modal para criação/edição de hábitos com:
  - `ion-select`: Seleção de categoria e frequência
  - `ion-datetime`: Seleção de data de início
  - `ion-input`: Campos de texto
  - `ion-textarea`: Campo de descrição

### 2. Página de Categorias (`/categorias`)
**Componentes Ionic Utilizados:**
- `ion-content`: Container principal
- `ion-grid`, `ion-row`, `ion-col`: Sistema de grid
- `ion-card`: Cards para exibição das categorias
- `ion-badge`: Exibição de status e prioridade
- `ion-fab`: Botão flutuante para adicionar categorias
- `ion-item`: Itens de formulário no modal

**Funcionalidades:**
- Listagem de categorias
- Adição de novas categorias
- Edição de categorias existentes
- Exclusão de categorias
- Modal para criação/edição com:
  - `ion-input`: Campos de texto
  - `ion-select`: Seleção de status e prioridade
  - Validação de formulários

### 3. Página de Objetivos (`/objetivos`)
**Componentes Ionic Utilizados:**
- `ion-content`: Container principal
- `ion-grid`, `ion-row`, `ion-col`: Sistema de grid
- `ion-card`: Cards para exibição dos objetivos
- `ion-range`: Barra de progresso
- `ion-fab`: Botão flutuante para adicionar objetivos
- `ion-datetime`: Seleção de datas

**Funcionalidades:**
- Listagem de objetivos
- Adição de novos objetivos
- Edição de objetivos existentes
- Exclusão de objetivos
- Acompanhamento de progresso
- Modal para criação/edição com:
  - `ion-input`: Campos de texto
  - `ion-textarea`: Campo de descrição
  - `ion-datetime`: Seleção de datas

### 4. Página de Conquistas (`/conquistas`)
**Componentes Ionic Utilizados:**
- `ion-content`: Container principal
- `ion-grid`, `ion-row`, `ion-col`: Sistema de grid
- `ion-card`: Cards para exibição das conquistas
- `ion-fab`: Botão flutuante para adicionar conquistas
- `ion-select`: Seleção múltipla de hábitos relacionados

**Funcionalidades:**
- Listagem de conquistas
- Adição de novas conquistas
- Edição de conquistas existentes
- Exclusão de conquistas
- Modal para criação/edição com:
  - `ion-input`: Campos de texto
  - `ion-select`: Seleção de hábitos relacionados
  - Validação de formulários

## Componentes Compartilhados

### Header (`app-header`)
Componente de cabeçalho reutilizável em todas as páginas, contendo:
- `ion-toolbar`: Barra de ferramentas
- `ion-title`: Título da página
- `ion-buttons`: Botões de navegação

## Recursos Adicionais
- Sistema de rotas com Angular Router
- Formulários reativos com ReactiveFormsModule
- Validação de formulários
- Integração com serviços HTTP
- Gerenciamento de estado
- Componentes modais para criação/edição
- Alertas de confirmação para exclusão
- Feedback visual para ações do usuário

## Tecnologias Utilizadas
- Ionic Framework
- Angular
- TypeScript
- SCSS para estilização
- RxJS para programação reativa
- Angular Forms para validação
- Angular HTTP Client para requisições 