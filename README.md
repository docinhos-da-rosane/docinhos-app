# 🍬 Docinhos App

O **Docinhos App** é uma aplicação web desenvolvida em **React** para apresentar o catálogo digital de uma pequena empreendedora do ramo de confeitaria.

A aplicação possui uma vitrine pública para consulta dos docinhos disponíveis, preços, porções e produtos em destaque, além de uma área administrativa para gerenciamento do catálogo.

O projeto tem como objetivo centralizar as informações do negócio em uma plataforma simples e organizada, facilitando a divulgação dos produtos e permitindo que os clientes consultem o catálogo antes de iniciar uma encomenda pelo WhatsApp.

<br>

🔗 **Aplicação publicada:** [Docinhos App](https://docinhos-app.onrender.com/)

<br>

## Principais funcionalidades

### Vitrine pública

* Visualização dos produtos em destaque
* Consulta do catálogo de docinhos
* Consulta dos detalhes de um produto
* Visualização de preços e porções disponíveis
* Identificação de produtos temporariamente indisponíveis
* Solicitação de encomenda pelo WhatsApp

### Área administrativa

* Autenticação da administradora
* Cadastro de produtos
* Listagem de produtos
* Consulta detalhada de produtos
* Edição de produtos
* Ativação e inativação de produtos
* Exclusão de produtos
* Gerenciamento de produtos em destaque

<br>

## Tecnologias utilizadas

* **Frontend:** React 19, TypeScript e Vite
* **Interface:** Tailwind CSS e shadcn/ui
* **Roteamento:** React Router
* **Requisições e estado assíncrono:** Axios e TanStack Query
* **Testes:** Vitest e React Testing Library
* **Qualidade e padronização:** ESLint e Prettier
* **Ícones:** Lucide React

<br>

## Como rodar o projeto

### Pré-requisitos

Antes de começar, você precisará ter instalado:

* **Git**
* **Node.js**
* **npm**

### 1. Clone o repositório

```bash
git clone https://github.com/docinhos-da-rosane/docinhos-app.git

cd docinhos-app
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Execute a aplicação

```bash
npm run dev
```

Após a inicialização, a aplicação estará disponível em:

```text
http://localhost:5173
```

<br>

## Testes

O projeto utiliza **Vitest** e **React Testing Library** para execução dos testes.

Para executar os testes em modo interativo:

```bash
npm run test
```

<br>

## Cobertura de código

O projeto utiliza **Vitest Coverage com V8** para análise da cobertura dos testes.

Para executar os testes e gerar o relatório de cobertura:

```bash
npm run test:coverage
```

O relatório será gerado em:

```text
coverage/index.html
```

Abra o arquivo `index.html` no navegador para visualizar os detalhes da cobertura.

> O projeto estabelece uma cobertura mínima de **80% das linhas de código**.

<br>

## Padronização de código

O projeto utiliza **ESLint** e **Prettier** para manter o código consistente e padronizado.

### Verificar o código com ESLint

```bash
npm run lint
```

### Verificar a formatação

```bash
npm run format:check
```

### Corrigir a formatação automaticamente

```bash
npm run format
```

<br>

## Verificação do projeto

Para executar todas as verificações utilizadas na integração contínua:

```bash
npm run verify
```

O comando executa:

* Verificação do código com ESLint
* Verificação da formatação com Prettier
* Testes com análise de cobertura
* Build da aplicação

<br>

## Backend

A aplicação consome uma API REST desenvolvida separadamente utilizando **Java e Spring Boot**.

A API é responsável pelo gerenciamento dos dados utilizados pela vitrine pública e pela área administrativa.

> 🔗 Repositório do backend: [Docinhos API](https://github.com/docinhos-da-rosane/docinhos-api)

<br>

<hr>

<p align="center">
  Desenvolvido com ☕ e 🍬 por
  <a href="https://br.linkedin.com/in/rachel-pizane">
    Rachel Pizane Maia
  </a>
</p>
