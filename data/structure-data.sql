BEGIN; 

DROP TABLE IF EXISTS "categories", "products", "roles", "users", "orders", "order_has_product", "tva";

CREATE TABLE "categories" (
    "id"         INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"       TEXT NOT NULL,
    "created_at" DATE NOT NULL DEFAULT NOW(),
    "updated_at" DATE
);

CREATE TABLE "tva" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"         TEXT NOT NULL,
    "value"         FLOAT NOT NULL
);

CREATE TABLE "products" (
    "id"              INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ref"             TEXT NOT NULL,
    "title"           TEXT NOT NULL,
    "description"     TEXT NOT NULL,
    "image"           TEXT NOT NULL,
    "priceHT"         FLOAT NOT NULL,
    "category_id"     INTEGER REFERENCES categories("id"),
    "tva_id"          INTEGER REFERENCES tva("id"),
    "created_at"      DATE NOT NULL DEFAULT NOW(),
    "updated_at"      DATE
);

CREATE TABLE "roles" (
    "id"            INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"          TEXT NOT NULL,
    "created_at"    DATE NOT NULL DEFAULT NOW(),
    "updated_at"    DATE
);

CREATE TABLE "users" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              TEXT NOT NULL,
    "email"             TEXT NOT NULL,
    "password"          TEXT NOT NULL,
    "role_id"           INTEGER REFERENCES roles("id"),
    "phone"             TEXT,
    "shipping"          TEXT,
    "billing"           TEXT,
    "created_at"        DATE NOT NULL DEFAULT NOW(),
    "updated_at"        DATE
);

CREATE TABLE "orders" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "totalTTC"          FLOAT NOT NULL,
    "totalHT"           FLOAT NOT NULL,
    "tax"               FLOAT NOT NULL,
    "user_id"           INTEGER REFERENCES users("id"),
    "adress"            TEXT,
    "quantity"          INT NOT NULL,
    "state"             TEXT,
    "created_at"        DATE NOT NULL DEFAULT NOW(),
    "updated_at"        DATE
);



CREATE TABLE "order_has_product" (
    "product_id"        INTEGER NOT NULL REFERENCES "products"("id"),
    "order_id"          INTEGER NOT NULL REFERENCES "orders"("id"),
    "quantity"          INTEGER NOT NULL,
    "priceHT"           FLOAT NOT NULL,
    "tva"               TEXT NOT NULL,
    "state"             TEXT
);

COMMIT;

