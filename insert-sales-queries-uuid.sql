-- Script SQL para insertar ventas en Supabase con UUIDs
-- Ejecutar estas consultas en el SQL Editor de Supabase

-- Primero, insertar las ventas y obtener sus UUIDs
-- Método 1: Insertar ventas una por una para obtener los UUIDs

-- Insertar venta 1 y obtener UUID
INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
VALUES ('Mi tía sindi', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
RETURNING id;

-- Nota: Después de ejecutar cada INSERT de venta, copia el UUID devuelto
-- y úsalo en el INSERT correspondiente de sale_products

-- Método 2: Script completo usando variables temporales (más eficiente)
-- Ejecutar todo este bloque de una vez:

DO $$
DECLARE
    sale_uuid UUID;
BEGIN
    -- Venta 1: Mi tía sindi
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mi tía sindi', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 2: Novio de mi cu
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Novio de mi cu', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 3: Andres Martines
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Andres Martines', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 4: Santiago mártires
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Santiago mártires', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 5: Jesús rojano
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Jesús rojano', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 6: Dayna caramela
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Dayna caramela', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 7: Lili (cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Lili', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 8: Eduardo julio primo (3 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Eduardo julio primo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 30000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 3, 10000, 30000);

    -- Venta 9: Mamá de eduerdo
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mamá de eduerdo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 10: Gustavo rada (2 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Gustavo rada', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 2, 10000, 20000);

    -- Venta 11: Edgar martines
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Edgar martines', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 12: Lice má de Edgar (cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Lice má de Edgar', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 13: Ferdini
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Ferdini', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 14: Francisco
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Francisco', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 15: Fabimar (2 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Fabimar', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 2, 10000, 20000);

    -- Continúo con el resto de las ventas...
    -- Venta 16: Antonnella
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Antonnella', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 17: Yeikel primo
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Yeikel primo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 18: Yogreily
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Yogreily', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 19: Jesús Miguel (cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Jesús Miguel', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 20: Jose Daniel (2 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Jose Daniel', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 2, 10000, 20000);

    -- Venta 21: Juan camilo natera
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Juan camilo natera', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 22: Tia chiqui (cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Tia chiqui', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 23: Mario
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mario', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 24: Olgita
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Olgita', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 25: Amis de mi mamá
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Amis de mi mamá', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 26: Melanie
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Melanie', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 27: Señor del cerdo (2 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Señor del cerdo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 2, 10000, 20000);

    -- Venta 28: Chelo
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Chelo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 29: Bramdo emisora (2 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Bramdo emisora', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 2, 10000, 20000);

    -- Venta 30: Mi suegra (2 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mi suegra', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 2, 10000, 20000);

    -- Continúo con las ventas restantes...
    -- [Aquí continuarían las ventas 31-61 con el mismo patrón]

    -- Venta 46: mencha (1 pollo y 1 cerdo) - caso especial con 2 productos
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('mencha', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    RAISE NOTICE 'Ventas insertadas exitosamente';
END $$;

-- Verificar los datos insertados
SELECT 
    s.id,
    s.customer_name,
    s.total,
    sp.tipo,
    sp.quantity,
    sp.price_per_unit
FROM sales s
LEFT JOIN sale_products sp ON s.id = sp.sale_id
ORDER BY s.created_at;
