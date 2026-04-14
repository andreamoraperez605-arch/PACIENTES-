const express = require('express')
const mysql = require('mysql2')
const cors = require('cors')
const path = require('path')

const app = express()

app.use(cors())
app.use(express.static(path.join(__dirname, 'public')))

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'pacientes'
})

app.get('/estadisticas', (req, res) => {
  const query = `
    SELECT 
      SUM(CASE WHEN tratamiento = TRUE THEN 1 ELSE 0 END) AS en_tratamiento,
      SUM(CASE WHEN fecha_alta IS NOT NULL THEN 1 ELSE 0 END) AS dados_alta,
      SUM(CASE WHEN fecha_baja IS NOT NULL THEN 1 ELSE 0 END) AS abandonaron
    FROM pacientes
  `
  db.query(query, (err, result) => {
    if (err) { res.status(500).json(err); return }
    res.json(result[0])
  })
})

app.get('/edades', (req, res) => {
  const query = `
    SELECT
      SUM(CASE WHEN edad BETWEEN 11 AND 12 THEN 1 ELSE 0 END) AS edad_11_12,
      SUM(CASE WHEN edad BETWEEN 13 AND 14 THEN 1 ELSE 0 END) AS edad_13_14,
      SUM(CASE WHEN edad BETWEEN 15 AND 16 THEN 1 ELSE 0 END) AS edad_15_16
    FROM pacientes
  `
  db.query(query, (err, result) => {
    if (err) { res.status(500).json(err); return }
    res.json(result[0])
  })
})

app.get('/escuelas', (req, res) => {
  const query = `
    SELECT escuela, COUNT(*) AS total
    FROM pacientes
    WHERE escuela IS NOT NULL
    GROUP BY escuela
    ORDER BY total DESC
  `
  db.query(query, (err, result) => {
    if (err) { res.status(500).json(err); return }
    res.json(result)
  })
})

app.get('/procedencia', (req, res) => {
  const query = `
    SELECT procedencia, COUNT(*) AS total
    FROM pacientes
    WHERE procedencia IS NOT NULL
    GROUP BY procedencia
  `
  db.query(query, (err, result) => {
    if (err) { res.status(500).json(err); return }
    res.json(result)
  })
})

app.get('/motivo', (req, res) => {
  const query = `
    SELECT motivo, COUNT(*) AS total
    FROM pacientes
    WHERE motivo IS NOT NULL
    GROUP BY motivo
  `
  db.query(query, (err, result) => {
    if (err) { res.status(500).json(err); return }
    res.json(result)
  })
})



app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
})