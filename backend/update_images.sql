-- Script para actualizar las imágenes en la base de datos

-- Casa Santa Teresita - Alquileres Residenciales
UPDATE alojamientos 
SET imagen = 'alojamiento/casa-santa-teresita/img1.jpeg'
WHERE nombre LIKE '%Santa Teresita%';

-- Cabaña Magnolia
UPDATE alojamientos 
SET imagen = 'alojamiento/cabania/cabania-magnolia/img1.jpg',
    logo = 'alojamiento/cabania/cabania-magnolia/logo1.jpg'
WHERE nombre LIKE '%Magnolia%';

-- Alquileres Residenciales - imagen genérica
UPDATE alojamientos 
SET imagen = 'alojamiento/alquileres-residenciales/img2.jpeg'
WHERE categoria = 'Alquileres Residenciales' AND imagen IS NULL;

-- Ver resultados
SELECT id, nombre, categoria, imagen, logo FROM alojamientos;
