-- Revert ecommerce:structure from pg

BEGIN;

DROP TABLE IF EXISTS "order_adress_type", "adress_type", "categories", "products", "roles", "adresses", "users", "orders", "order_product", "tva";

COMMIT;
