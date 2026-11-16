const express = require('express');
const sql = require('mssql');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER || 'localhost',
  database: process.env.DB_NAME,
  options: {
    encrypt: true,
    trustServerCertificate: false
  }
};

let poolPromise;

async function getPool() {
  if (!poolPromise) {
    poolPromise = sql.connect(dbConfig).catch((err) => {
      poolPromise = null;
      throw err;
    });
  }
  return poolPromise;
}

async function initDatabase() {
  try {
    const pool = await getPool();
    await pool.request().query(`
      IF NOT EXISTS (SELECT * FROM sysobjects WHERE name='Catalogo' AND xtype='U')
      CREATE TABLE Catalogo (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Titulo NVARCHAR(100) NOT NULL,
        Categoria NVARCHAR(50) NOT NULL,
        Puntuacion INT NOT NULL
      );
    `);
    console.log('Tabla "Catalogo" verificada/creada correctamente en Azure SQL Database.');
  } catch (error) {
    console.error('Error al inicializar la base de datos:', error.message);
  }
}

app.get('/api/items', async (req, res) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query('SELECT Id, Titulo, Categoria, Puntuacion FROM Catalogo ORDER BY Id DESC');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al obtener los registros:', error.message);
    res.status(500).json({ error: 'Error al obtener los elementos del catálogo.' });
  }
});

app.post('/api/items', async (req, res) => {
  const { titulo, categoria, puntuacion } = req.body;

  if (!titulo || !categoria || puntuacion === undefined) {
    return res.status(400).json({ error: 'Los campos titulo, categoria y puntuacion son obligatorios.' });
  }

  const score = parseInt(puntuacion, 10);
  if (isNaN(score) || score < 1 || score > 10) {
    return res.status(400).json({ error: 'La puntuación debe ser un número entre 1 y 10.' });
  }

  try {
    const pool = await getPool();
    await pool
      .request()
      .input('titulo', sql.NVarChar(100), titulo.trim())
      .input('categoria', sql.NVarChar(50), categoria.trim())
      .input('puntuacion', sql.Int, score)
      .query('INSERT INTO Catalogo (Titulo, Categoria, Puntuacion) VALUES (@titulo, @categoria, @puntuacion)');

    res.status(201).json({ message: 'Elemento guardado correctamente.' });
  } catch (error) {
    console.error('Error al insertar el registro:', error.message);
    res.status(500).json({ error: 'Error al guardar el elemento en la base de datos.' });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en el puerto ${PORT}`);
  initDatabase();
});
