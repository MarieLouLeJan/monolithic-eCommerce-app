-- Revert ecommerce:structure from pg

BEGIN;

DROP TABLE "roles", "adress_types", "users", "adresses", "categories", "tva", "products", "order_states", "orders", "order_adress_type", "order_product";

COMMIT;
