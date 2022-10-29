BEGIN; 

DROP TABLE IF EXISTS "categories", "products", "roles", "users", "orders", "order_has_product", "tva";

CREATE TABLE "roles" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              TEXT NOT NULL UNIQUE
);

CREATE TABLE "users" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname"         TEXT NOT NULL,
    "lastname"          TEXT NOT NULL,
    "email"             TEXT NOT NULL UNIQUE,
    "password"          TEXT NOT NULL,
    "role_id"           INTEGER NOT NULL REFERENCES roles("id"),
    "phone"             TEXT,
    "shipping"          TEXT,
    "billing"           TEXT
);

CREATE TABLE "categories" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name"              TEXT NOT NULL UNIQUE,
    "created_by"        INTEGER NOT NULL REFERENCES users("id")
);

CREATE TABLE "tva" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL UNIQUE,
    "value"             FLOAT NOT NULL
);

CREATE TABLE "products" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ref"               TEXT NOT NULL UNIQUE,
    "title"             TEXT NOT NULL,
    "description"       TEXT NOT NULL,
    "image"             TEXT NOT NULL,
    "priceHT"           FLOAT NOT NULL,
    "category_id"       INTEGER NOT NULL REFERENCES categories("id"),
    "tva_id"            INTEGER NOT NULL REFERENCES tva("id"),
    "created_by"        INTEGER NOT NULL REFERENCES users("id")
);


CREATE TABLE "orders" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "totalTTC"          FLOAT NOT NULL,
    "totalHT"           FLOAT NOT NULL,
    "tax"               FLOAT NOT NULL,
    "user_id"           INTEGER NOT NULL REFERENCES users("id"),
    "adress"            TEXT NOT NULL,
    "quantity"          INT NOT NULL NOT NULL,
    "state"             TEXT NOT NULL,
    "date"              DATE NOT NULL DEFAULT NOW()
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

