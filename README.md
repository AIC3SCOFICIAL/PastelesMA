# 🥟 Pasteles M&A - Sistema de Gestión

Una aplicación web progresiva (PWA) completa para la gestión de ventas y producción de pasteles, desarrollada con Node.js, Express y tecnologías web modernas.

## 🚀 Características Principales

### 📱 Progressive Web App (PWA)
- **Instalable** en cualquier dispositivo (móvil, tablet, desktop)
- **Funciona offline** con Service Worker
- **Notificaciones push** (preparado para futuras implementaciones)
- **Interfaz nativa** cuando se instala

### 📊 Dashboard Inteligente
- Estadísticas en tiempo real de ventas y ganancias
- Gráficos de rendimiento del negocio
- Resumen de ventas recientes
- Indicadores clave de rendimiento (KPIs)

### 🛒 Gestión de Ventas
- Registro completo de pedidos con datos del cliente
- Filtros avanzados por estado, tipo de producto y cliente
- Control de pagos y entregas
- Cálculo automático de totales y ganancias
- Exportación e importación de datos en JSON

### 🏭 Control de Producción
- Registro detallado de costos de producción
- Gestión de ingredientes y cantidades
- Cálculo automático de costo por unidad
- Análisis de rentabilidad por lote
- Historial completo de producciones

### 🎨 Interfaz Moderna
- Diseño responsivo con Tailwind CSS
- Optimizada para dispositivos móviles
- Tema moderno con gradientes y animaciones
- Navegación intuitiva y accesible

## 🛠️ Tecnologías Utilizadas

### Backend
- **Node.js** - Runtime de JavaScript
- **Express.js** - Framework web
- **JSON** - Base de datos local
- **Helmet** - Seguridad HTTP
- **Morgan** - Logging de requests
- **CORS** - Cross-Origin Resource Sharing

### Frontend
- **HTML5** - Estructura semántica
- **CSS3** - Estilos modernos
- **JavaScript ES6+** - Lógica del cliente
- **Tailwind CSS** - Framework de utilidades CSS
- **Remix Icons** - Iconografía moderna

### PWA
- **Service Worker** - Funcionalidad offline
- **Web App Manifest** - Configuración de instalación
- **Cache API** - Almacenamiento en caché
- **IndexedDB** - Base de datos del navegador

## 📦 Instalación y Configuración

### Prerrequisitos
- Node.js 16+ 
- npm o yarn

### Instalación Local
```bash
# Clonar el repositorio
git clone https://github.com/AIC3SCOFICIAL/pasteles.git
cd pasteles

# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev

# O iniciar en producción
npm start
```

### Despliegue en Vercel
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

## 🌐 Estructura del Proyecto

```
pasteles-node/
├── 📁 data/                    # Base de datos JSON
│   └── database.json          # Datos de ventas y producción
├── 📁 pages/                   # Páginas HTML
│   ├── dashboard.html         # Panel de control
│   ├── ventas.html           # Gestión de ventas
│   └── produccion.html       # Control de producción
├── 📁 public/                  # Archivos estáticos
│   ├── 📁 css/               # Estilos CSS
│   ├── 📁 js/                # JavaScript del cliente
│   ├── 📁 icons/             # Iconos PWA
│   ├── manifest.json         # Manifiesto PWA
│   ├── sw.js                 # Service Worker
│   └── index.html            # Página principal
├── server.js                  # Servidor Express
├── package.json              # Dependencias y scripts
├── vercel.json               # Configuración de Vercel
└── README.md                 # Documentación
```

## 🔧 API Endpoints

### Ventas
- `GET /api/sales` - Obtener todas las ventas
- `POST /api/sales` - Crear nueva venta
- `PUT /api/sales/:id` - Actualizar venta
- `DELETE /api/sales/:id` - Eliminar venta

### Producción
- `GET /api/production` - Obtener costos de producción
- `POST /api/production` - Registrar nueva producción
- `PUT /api/production/:id` - Actualizar producción
- `DELETE /api/production/:id` - Eliminar producción

### Estadísticas
- `GET /api/stats` - Obtener estadísticas generales

## 📱 Instalación como PWA

### En Móviles (Android/iOS)
1. Abrir la aplicación en el navegador
2. Tocar el menú del navegador (⋮)
3. Seleccionar "Agregar a pantalla de inicio"
4. Confirmar la instalación

### En Desktop (Chrome/Edge)
1. Abrir la aplicación en el navegador
2. Buscar el ícono de instalación en la barra de direcciones
3. Hacer clic en "Instalar"
4. La app aparecerá como aplicación nativa

## 🔒 Características de Seguridad

- **Helmet.js** - Headers de seguridad HTTP
- **Rate Limiting** - Protección contra ataques DDoS
- **CORS configurado** - Control de acceso entre dominios
- **Validación de datos** - Sanitización de inputs
- **HTTPS Ready** - Preparado para certificados SSL

## 📊 Funcionalidades de Negocio

### Gestión de Ventas
- ✅ Registro de clientes y pedidos
- ✅ Control de inventario por tipo de pastel
- ✅ Seguimiento de pagos y entregas
- ✅ Cálculo automático de ganancias
- ✅ Filtros y búsquedas avanzadas

### Control de Producción
- ✅ Registro de ingredientes y costos
- ✅ Cálculo de costo por unidad
- ✅ Análisis de rentabilidad
- ✅ Historial de producciones
- ✅ Optimización de costos

### Reportes y Estadísticas
- ✅ Dashboard con KPIs en tiempo real
- ✅ Gráficos de ventas y ganancias
- ✅ Exportación de datos
- ✅ Análisis de tendencias

## 🚀 Próximas Características

- [ ] Integración con WhatsApp Business API
- [ ] Sistema de notificaciones push
- [ ] Backup automático en la nube
- [ ] Reportes en PDF
- [ ] Integración con sistemas de pago
- [ ] Gestión de inventario avanzada
- [ ] Análisis predictivo de ventas

## 🤝 Contribución

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Equipo

- **Desarrollo** - AIC3SCOFICIAL
- **Diseño** - Sistema M&A
- **Testing** - Comunidad

## 📞 Soporte

Para soporte técnico o consultas:
- 📧 Email: soporte@pasteles-ma.com
- 🐛 Issues: [GitHub Issues](https://github.com/AIC3SCOFICIAL/pasteles/issues)
- 📱 WhatsApp: +57 XXX XXX XXXX

---

**Hecho con ❤️ para el crecimiento de tu negocio de pasteles** 🥟
