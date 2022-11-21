-- Revert ecommerce:structure from pg

BEGIN;

DROP TABLE "order_type_adress", "order_product", "roles", "adress_types", "users", "adresses", "categories", "tva", "products", "order_states", "orders", "product_review";

COMMIT;