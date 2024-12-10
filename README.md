# Notes Application

Este é um projeto full-stack para gerenciamento de notas, desenvolvido com **NestJS** no backend e **Next.js** no frontend.

---

## Prerequisites

Certifique-se de ter os seguintes requisitos instalados na sua máquina:
- **Node.js** (recomendado: versão LTS mais recente)
- **npm** (Node Package Manager)
- **MongoDB** (para o banco de dados)

---

## Instalação

1. **Clone o repositório** para sua máquina local:
    ```sh
    git clone <repository_url>
    ```

2. **Navegue até o diretório do projeto**:
    ```sh
    cd notes-application
    ```

### Backend

1. **Instale as dependências do backend**:
    ```sh
    cd backend
    npm install
    ```

2. **Configure as variáveis de ambiente**:
    - Crie um arquivo `.env` na pasta `backend` com os seguintes parâmetros:
      ```
      MONGO_URI=<sua conexão MongoDB>
      ```

3. **Inicie o backend**:
    ```sh
    npm run start
    ```

O backend estará disponível em: [http://localhost:3000](http://localhost:3000)

---

### Frontend

1. **Instale as dependências do frontend**:
    ```sh
    cd frontend
    npm install
    ```

2. **Inicie o frontend**:
    ```sh
    npm run dev
    ```

O frontend estará disponível em: [http://localhost:3001](http://localhost:3001)

---

## Endpoints Disponíveis

### Backend (NestJS)
- **`GET /notes`**: Retorna todas as notas.
- **`POST /notes`**: Cria uma nova nota.
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **`PUT /notes/:id`**: Atualiza uma nota existente.
  - Body:
    ```json
    {
      "title": "string",
      "content": "string"
    }
    ```
- **`DELETE /notes/:id`**: Remove uma nota.

---

## Funcionalidades da Aplicação

### Frontend (Next.js)
- **Exibição de notas**: Lista todas as notas com título, conteúdo e data de criação.
- **Criação de notas**: Adicione novas notas pelo formulário.
- **Edição de notas**: Edite notas existentes clicando no botão de editar.
- **Exclusão de notas**: Exclua notas ao clicar no botão de deletar.

---

## Estrutura do Projeto

- **Backend**: Localizado na pasta `backend`, utiliza **NestJS** e **Mongoose** para integração com o MongoDB.
- **Frontend**: Localizado na pasta `frontend`, utiliza **Next.js** para renderização e gerenciamento do estado da aplicação.

---

## Acessando a Aplicação

- **Frontend**: [http://localhost:3001](http://localhost:3001)  
- **Backend**: [http://localhost:3000](http://localhost:3000)  

---

## Problemas ou Dúvidas

Se você encontrar algum problema ou precisar de suporte, sinta-se à vontade para abrir uma _issue_ no repositório.
