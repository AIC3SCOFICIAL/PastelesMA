-- Script SQL completo para insertar todas las 61 ventas en Supabase con UUIDs
-- Ejecutar este bloque completo en el SQL Editor de Supabase

DO $$
DECLARE
    sale_uuid UUID;
BEGIN
    -- Venta 1: Mi tía sindi (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mi tía sindi', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 2: Novio de mi cu (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Novio de mi cu', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 3: Andres Martines (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Andres Martines', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 4: Santiago mártires (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Santiago mártires', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 5: Jesús rojano (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Jesús rojano', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 6: Dayna caramela (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Dayna caramela', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 7: Lili (1 cerdo)
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

    -- Venta 9: Mamá de eduerdo (1 pollo)
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

    -- Venta 11: Edgar martines (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Edgar martines', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 12: Lice má de Edgar (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Lice má de Edgar', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 13: Ferdini (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Ferdini', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 14: Francisco (1 pollo)
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

    -- Venta 16: Antonnella (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Antonnella', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 17: Yeikel primo (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Yeikel primo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 18: Yogreily (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Yogreily', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 19: Jesús Miguel (1 cerdo)
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

    -- Venta 21: Juan camilo natera (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Juan camilo natera', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 22: Tia chiqui (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Tia chiqui', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 23: Mario (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mario', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 24: Olgita (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Olgita', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 25: Amis de mi mamá (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Amis de mi mamá', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 26: Melanie (1 pollo)
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

    -- Venta 28: Chelo (1 pollo)
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

    -- Venta 31: Cuñado de Johan (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Cuñado de Johan', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 32: Keyla (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Keyla', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 33: Tia clari (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Tia clari', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 34: Seño solaida (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Seño solaida', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 35: Pastor (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Pastor', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 36: Tío ronal (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Tío ronal', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 37: Greys (2 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Greys', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 2, 10000, 20000);

    -- Venta 38: Yoryeily (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Yoryeily', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 39: Mamá owing (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Mamá owing', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 40: Migue vecino (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Migue vecino', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 41: mama de diana (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('mama de diana', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 42: mili chalchipa (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('mili chalchipa', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 43: tia kelli yeikel (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('tia kelli yeikel', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 44: abuelo (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('abuelo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 45: milton primo (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('milton primo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 46: mencha (1 pollo y 1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('mencha', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 47: Jesus Darjeli (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Jesus Darjeli', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 48: Orlando salas (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Orlando salas', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 49: Guido copia (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Guido copia', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 50: Darwin tienda (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Darwin tienda', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 51: tio armandito (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('tio armandito', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 52: abuela de antony (3 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('abuela de antony', NULL, NULL, NULL, 'pendiente', 'no_entregada', 30000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 3, 10000, 30000);

    -- Venta 53: jose Daniel 777 (2 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('jose Daniel 777', NULL, NULL, NULL, 'pendiente', 'no_entregada', 20000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 2, 10000, 20000);

    -- Venta 54: Duotech duban (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Duotech duban', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 55: donde plablo (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('donde plablo', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 56: Edwin marica (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('Edwin marica', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 57: pedri (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('pedri', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    -- Venta 58: xiorelis (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('xiorelis', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 59: sebastian (amigo liz) (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('sebastian (amigo liz)', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 60: jose caballero (1 pollo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('jose caballero', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'pollo', 1, 10000, 10000);

    -- Venta 61: wigui donde oscar (1 cerdo)
    INSERT INTO sales (customer_name, phone, address, notes, status, delivery_status, total, created_at) 
    VALUES ('wigui donde oscar', NULL, NULL, NULL, 'pendiente', 'no_entregada', 10000, NOW()) 
    RETURNING id INTO sale_uuid;
    INSERT INTO sale_products (sale_id, tipo, quantity, price_per_unit, subtotal) 
    VALUES (sale_uuid, 'cerdo', 1, 10000, 10000);

    RAISE NOTICE 'Todas las 61 ventas han sido insertadas exitosamente';
END $$;

-- Verificar los datos insertados
SELECT 
    s.id,
    s.customer_name,
    s.total,
    sp.tipo,
    sp.quantity,
    sp.price_per_unit,
    sp.subtotal
FROM sales s
LEFT JOIN sale_products sp ON s.id = sp.sale_id
ORDER BY s.created_at, s.customer_name;

-- Resumen de ventas por tipo
SELECT 
    sp.tipo,
    COUNT(*) as cantidad_ventas,
    SUM(sp.quantity) as total_pasteles,
    SUM(sp.subtotal) as total_ingresos
FROM sales s
JOIN sale_products sp ON s.id = sp.sale_id
GROUP BY sp.tipo
ORDER BY sp.tipo;
