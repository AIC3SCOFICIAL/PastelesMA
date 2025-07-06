# 🚀 Configuración de Supabase para Pasteles App

Esta aplicación ahora soporta **Supabase** como base de datos, lo que permite múltiples productos por venta y una mejor escalabilidad.

## 📋 Pasos para Configurar Supabase

### 1. Crear Proyecto en Supabase

1. Ve a [supabase.com](https://supabase.com)
2. Crea una cuenta o inicia sesión
3. Crea un nuevo proyecto
4. Anota la **URL del proyecto** y la **clave anónima**

### 2. Configurar Variables de Entorno

1. Copia el archivo `.env.example` a `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edita el archivo `.env` con tus credenciales:
   ```env
   REACT_APP_SUPABASE_URL=https://tu-proyecto-id.supabase.co
   REACT_APP_SUPABASE_ANON_KEY=tu-clave-anonima-aqui
   ```

### 3. Crear Tablas en Supabase

Ve al **SQL Editor** en tu dashboard de Supabase y ejecuta el siguiente script:

```sql
-- Tabla de ventas con soporte para múltiples productos
CREATE TABLE IF NOT EXISTS sales (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT,
  address TEXT,
  notes TEXT,
  status TEXT DEFAULT 'pendiente',
  delivery_status TEXT DEFAULT 'pendiente',
  total DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos de una venta (relación uno a muchos)
CREATE TABLE IF NOT EXISTS sale_products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  sale_id UUID REFERENCES sales(id) ON DELETE CASCADE,
  tipo TEXT NOT NULL,
  quantity INTEGER NOT NULL,
  price_per_unit DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de productos del catálogo
CREATE TABLE IF NOT EXISTS products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  categoria TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de producción
CREATE TABLE IF NOT EXISTS production (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  date DATE NOT NULL,
  units INTEGER NOT NULL,
  total_cost DECIMAL(10,2) NOT NULL,
  unit_cost DECIMAL(10,2) NOT NULL,
  additional_costs DECIMAL(10,2) DEFAULT 0,
  notes TEXT,
  estimated_profit_per_unit DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de ingredientes de producción
CREATE TABLE IF NOT EXISTS production_ingredients (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  production_id UUID REFERENCES production(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  quantity DECIMAL(10,2) NOT NULL,
  cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insertar productos por defecto
INSERT INTO products (nombre, descripcion, precio, categoria) VALUES
('Pasteles de Pollo', 'Deliciosos pasteles rellenos de pollo', 10000, 'Principal'),
('Pasteles de Cerdo', 'Pasteles tradicionales de cerdo', 10000, 'Principal'),
('Pasteles Mixtos', 'Combinación de pollo y cerdo', 11000, 'Especial'),
('Pasteles de Queso', 'Pasteles vegetarianos de queso', 9000, 'Vegetariano'),
('Pasteles Vegetarianos', 'Pasteles con vegetales', 8500, 'Vegetariano')
ON CONFLICT DO NOTHING;

-- Habilitar RLS (Row Level Security)
ALTER TABLE sales ENABLE ROW LEVEL SECURITY;
ALTER TABLE sale_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE production ENABLE ROW LEVEL SECURITY;
ALTER TABLE production_ingredients ENABLE ROW LEVEL SECURITY;

-- Políticas de seguridad (permitir todo por ahora - ajustar según necesidades)
CREATE POLICY "Allow all operations" ON sales FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON sale_products FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON products FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON production FOR ALL USING (true);
CREATE POLICY "Allow all operations" ON production_ingredients FOR ALL USING (true);
```

### 4. Ejecutar la Aplicación

```bash
# Instalar dependencias
npm install

# Construir la aplicación React
npm run build

# Iniciar el servidor
npm start
```

## 🎯 Nuevas Funcionalidades con Supabase

### ✅ Múltiples Productos por Venta
- Ahora puedes agregar varios tipos de pasteles en una sola venta
- Cada producto tiene su propia cantidad y precio
- Cálculo automático de subtotales y total

### ✅ Base de Datos Escalable
- PostgreSQL en la nube
- Respaldos automáticos
- Sincronización en tiempo real

### ✅ Mejor Estructura de Datos
- Relaciones normalizadas entre tablas
- Soporte para consultas complejas
- Mejor rendimiento

## 🔧 Estructura de Datos

### Tabla `sales`
- `id`: UUID único
- `customer_name`: Nombre del cliente
- `phone`: Teléfono/WhatsApp
- `address`: Dirección de entrega
- `notes`: Notas adicionales
- `status`: Estado del pedido (pendiente, pagado, cancelado)
- `delivery_status`: Estado de entrega
- `total`: Total de la venta

### Tabla `sale_products`
- `sale_id`: Referencia a la venta
- `tipo`: Tipo de pastel
- `quantity`: Cantidad
- `price_per_unit`: Precio por unidad
- `subtotal`: Subtotal del producto

## 🚨 Migración desde SQLite

Si tienes datos en SQLite, puedes exportarlos desde la aplicación y luego importarlos manualmente a Supabase usando el dashboard.

## 🔒 Seguridad

Las políticas RLS están configuradas para permitir todas las operaciones. En producción, deberías:

1. Configurar autenticación de usuarios
2. Ajustar las políticas RLS según tus necesidades
3. Usar variables de entorno seguras

## 📞 Soporte

Si tienes problemas con la configuración, revisa:

1. Que las credenciales en `.env` sean correctas
2. Que las tablas se hayan creado correctamente
3. Que las políticas RLS estén habilitadas

¡Disfruta de tu nueva aplicación con Supabase! 🎉
