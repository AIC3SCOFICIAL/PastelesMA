-- Script SQL para configurar Supabase con pasteles de pollo y cerdo
-- Ejecutar este script en el SQL Editor de Supabase

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

-- Insertar productos por defecto (solo pollo y cerdo)
INSERT INTO products (nombre, descripcion, precio, categoria) VALUES
('Pasteles de Pollo', 'Deliciosos pasteles rellenos de pollo', 10000, 'Principal'),
('Pasteles de Cerdo', 'Pasteles tradicionales de cerdo', 10000, 'Principal')
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

-- Datos de ejemplo para probar
INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total) VALUES
('María González', '3001234567', 'Calle 123 #45-67, Bogotá', 'Entrega para evento familiar', 'pendiente', 'pendiente', 170000);

-- Obtener el ID de la venta recién creada para insertar productos
INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
SELECT 
  s.id,
  'pollo',
  12,
  10000,
  120000
FROM sales s WHERE s.customer_name = 'María González' LIMIT 1;

INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
SELECT 
  s.id,
  'cerdo',
  5,
  10000,
  50000
FROM sales s WHERE s.customer_name = 'María González' LIMIT 1;
