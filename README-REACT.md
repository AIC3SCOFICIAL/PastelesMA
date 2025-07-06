# 🥟 Pasteles M&A - Aplicación React

## 🚀 Migración Completa a React + JSX

Esta aplicación ha sido completamente migrada de HTML estático a **React + JSX** para una mejor experiencia de desarrollo y usuario.

## ✨ Nuevas Características

### 🔧 **Stack Tecnológico**
- **Frontend**: React 18 + JSX
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Backend**: Node.js + Express + SQLite

### 🎯 **Ventajas de la Migración**
- ✅ **Componentes Reutilizables** - Código más limpio y mantenible
- ✅ **Estado Reactivo** - Actualizaciones automáticas de la UI
- ✅ **Context API** - Gestión de estado global
- ✅ **TypeScript Ready** - Mejor tipado y detección de errores
- ✅ **Hot Reload** - Desarrollo más rápido
- ✅ **Mejor Performance** - Optimizaciones automáticas
- ✅ **SEO Friendly** - Server-side rendering ready

## 🏗️ **Arquitectura del Proyecto**

```
src/
├── components/           # Componentes reutilizables
│   ├── Layout/          # Layout principal y navegación
│   ├── Sales/           # Componentes de ventas
│   └── Production/      # Componentes de producción
├── pages/               # Páginas principales
│   ├── Dashboard.jsx    # Panel de control
│   ├── Sales.jsx        # Gestión de ventas
│   └── Production.jsx   # Control de producción
├── context/             # Context API para estado global
│   ├── SalesContext.jsx
│   └── ProductionContext.jsx
├── utils/               # Utilidades y API
│   └── api.js
├── App.jsx              # Componente principal
├── main.jsx             # Punto de entrada
└── index.css            # Estilos globales con Tailwind
```

## 🚀 **Comandos de Desarrollo**

### **Desarrollo**
```bash
# Instalar dependencias
npm install

# Desarrollo con React (puerto 3000)
npm run client

# Servidor API (puerto 3001)
npm run server

# Desarrollo completo (ambos servidores)
npm run dev
```

### **Producción**
```bash
# Build de React
npm run build

# Previsualizar build
npm run preview

# Servidor en producción
npm start
```

## 🎨 **Componentes Principales**

### **Layout System**
- `Layout.jsx` - Estructura principal
- `Sidebar.jsx` - Navegación lateral
- `Header.jsx` - Header móvil

### **Sales Management**
- `Sales.jsx` - Lista y gestión de ventas
- `SalesModal.jsx` - Formulario de ventas

### **Production Control**
- `Production.jsx` - Control de producción
- `ProductionModal.jsx` - Calculadora de costos

### **Context Providers**
- `SalesContext` - Estado global de ventas
- `ProductionContext` - Estado global de producción

## 🔄 **Gestión de Estado**

### **Sales Context**
```jsx
const { 
  sales, 
  loading, 
  createSale, 
  updateSale, 
  deleteSale,
  filteredSales 
} = useSales()
```

### **Production Context**
```jsx
const { 
  productions, 
  stats, 
  createProduction, 
  calculateCosts 
} = useProduction()
```

## 🎯 **Funcionalidades Implementadas**

### **📊 Dashboard**
- Estadísticas en tiempo real
- Ventas recientes
- Métricas de rendimiento
- Acceso rápido a funciones

### **🛒 Gestión de Ventas**
- CRUD completo de ventas
- Filtros avanzados
- Búsqueda en tiempo real
- Estados de pedido y entrega
- Export/Import de datos

### **🏭 Control de Producción**
- Calculadora de costos
- Gestión de ingredientes
- Cálculo automático de ganancias
- Historial de producciones
- Análisis de rentabilidad

## 🔧 **API Endpoints**

### **Ventas**
- `GET /api/sales` - Obtener ventas
- `POST /api/sales` - Crear venta
- `PUT /api/sales/:id` - Actualizar venta
- `DELETE /api/sales/:id` - Eliminar venta

### **Producción**
- `GET /api/production` - Obtener producciones
- `POST /api/production` - Crear producción
- `PUT /api/production/:id` - Actualizar producción
- `DELETE /api/production/:id` - Eliminar producción

### **Estadísticas**
- `GET /api/stats` - Estadísticas generales

## 🎨 **Estilos y Diseño**

### **Tailwind CSS Classes**
```css
/* Botones personalizados */
.btn-primary    /* Botón principal azul */
.btn-success    /* Botón verde */
.btn-warning    /* Botón naranja */
.btn-secondary  /* Botón gris */

/* Componentes */
.card           /* Tarjeta base */
.input-field    /* Campo de entrada */
.nav-link       /* Enlace de navegación */
.stat-card      /* Tarjeta de estadística */
```

### **Responsive Design**
- Mobile-first approach
- Breakpoints: `sm:`, `md:`, `lg:`, `xl:`
- Componentes adaptativos
- Touch-friendly interfaces

## 🔄 **Compatibilidad Legacy**

La aplicación mantiene compatibilidad con las páginas HTML originales:

- **React App**: `http://localhost:3001/`
- **Legacy HTML**: `http://localhost:3001/legacy/`

## 🚀 **Deployment**

### **Vercel (Recomendado)**
```bash
npm run build
vercel --prod
```

### **Netlify**
```bash
npm run build
# Subir carpeta dist/
```

### **Servidor Propio**
```bash
npm run build
npm start
```

## 🔧 **Configuración**

### **Vite Config**
```js
// vite.config.js
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:3001'
    }
  }
})
```

### **Tailwind Config**
```js
// tailwind.config.js
export default {
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: { /* colores personalizados */ }
    }
  }
}
```

## 📱 **PWA Features**

- ✅ Service Worker
- ✅ Manifest.json
- ✅ Offline support
- ✅ Install prompt
- ✅ Cache strategies

## 🐛 **Debugging**

### **React DevTools**
```bash
# Instalar extensión de navegador
# React Developer Tools
```

### **Logs de Desarrollo**
```bash
# Logs del servidor
npm run server

# Logs de React
npm run client
```

## 🔄 **Próximas Mejoras**

- [ ] TypeScript migration
- [ ] Unit testing (Jest + React Testing Library)
- [ ] E2E testing (Playwright)
- [ ] Storybook para componentes
- [ ] PWA avanzada
- [ ] Real-time updates (WebSockets)
- [ ] Dark mode
- [ ] Multi-idioma (i18n)

## 📞 **Soporte**

Para reportar bugs o solicitar features:
1. Crear issue en el repositorio
2. Incluir pasos para reproducir
3. Especificar navegador y versión

---

## 🎉 **¡Migración Completada!**

La aplicación ahora utiliza **React + JSX** para una experiencia de desarrollo moderna y una interfaz de usuario más robusta y mantenible.

**¡Disfruta desarrollando con React! 🚀**
