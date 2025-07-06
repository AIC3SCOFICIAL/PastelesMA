const express = require('express')
const cors = require('cors')
const path = require('path')

const app = express()
const PORT = process.env.PORT || 3001

// Middleware básico
app.use(cors())
app.use(express.json())

// Servir archivos estáticos desde la raíz del proyecto
app.use(express.static(path.join(__dirname)))

// Para React Router - servir index.html para todas las rutas no-API
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

// Manejo de errores globales
app.use((error, req, res, next) => {
  console.error('❌ Error:', error)
  res.status(500).json({
    success: false,
    message: 'Error interno del servidor',
  })
})

// Inicializar servidor
app.listen(PORT, () => {
  console.log(`
🚀 ===================================
   SERVIDOR PASTELES NODE.JS
🚀 ===================================
📡 Puerto: ${PORT}
🌐 URL: http://localhost:${PORT}
✅ Servidor iniciado exitosamente
🚀 ===================================
  `)
})


module.exports = app
