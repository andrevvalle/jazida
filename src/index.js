require('dotenv').config();

const express = require('express');
const { sequelize } = require('./config/database');
const pokemonRoutes = require('./routes/pokemonRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(pokemonRoutes);

app.get('/', (req, res) => {
  res.send('API está funcionando!');
});

async function assertDatabaseConnectionOk() {
  console.log(`Verificando conexão com o banco de dados...`);
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.log('Não foi possível conectar ao banco de dados:');
    console.log(error.message);
    process.exit(1);
  }
}

app.listen(PORT, async () => {
  await assertDatabaseConnectionOk();
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
