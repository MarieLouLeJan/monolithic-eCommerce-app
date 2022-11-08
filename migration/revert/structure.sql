-- Revert ecommerce:structure from pg

BEGIN;

DROP TABLE "adress_type_adress", "order_adress_type", "order_product", "roles", "adress_types", "users", "adresses", "categories", "tva", "products", "order_states", "orders";

COMMIT;
