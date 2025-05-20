# Golden Raspberry Awards API

Este projeto é uma API RESTful que fornece informações sobre os produtores que venceram a categoria **Pior Filme** do prêmio Golden Raspberry Awards, com destaque para os **menores e maiores intervalos** entre vitórias consecutivas.

## 📁 Estrutura do Projeto

- Node.js + Express
- SQLite em memória (via Sequelize)
- Leitura automática de CSV ao iniciar a aplicação
- Testes de integração com Jest e Supertest

---

## 🚀 Como executar o projeto

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/nome-do-repo.git
cd nome-do-repo
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Inicie a aplicação

```bash
npm start
```

A aplicação será iniciada em: [http://localhost:3000](http://localhost:3000)

---

## 📊 Endpoint principal

### `GET /awards`

Retorna os produtores com:

* **Menor intervalo** entre vitórias consecutivas (`min`)
* **Maior intervalo** entre vitórias consecutivas (`max`)

#### ✅ Exemplo de resposta:

```json
{
  "min": [
    {
      "producer": "Mínimo",
      "interval": 1,
      "previousWin": 1970,
      "followingWin": 1971
    }
  ],
  "max": [
    {
      "producer": "Máximo",
      "interval": 5,
      "previousWin": 2000,
      "followingWin": 2005
    }
  ]
}
```

---

## 🧪 Executar os testes

```bash
npm test
```

Os testes verificam se os dados processados a partir do CSV estão corretos e se o endpoint responde conforme o esperado.

---

## 🧠 Observações técnicas

* O CSV é lido automaticamente ao iniciar a aplicação.
* O banco de dados é criado em memória e populado dinamicamente.
* Não é necessário instalar nenhum SGBD externo.
* O projeto segue o nível 2 de maturidade REST (Richardson).

---

## 📂 Arquivo CSV

O arquivo original `Movielist.csv` está localizado em:

```
/data/Movielist.csv
```
