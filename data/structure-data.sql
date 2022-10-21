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



BEGIN;


INSERT INTO "categories" ("name")
VALUES ('Laptop'),
('Mobile'),
('Coucou'),
('categorie-vide');

INSERT INTO "tva" ("title", "value")
VALUES ('20%', 0.20), ('10%', 0.10);

INSERT INTO "products" ("ref", "title", "description", "image", "priceHT", "category_id", "tva_id")
VALUES ('P00001', 'Macbroke', 'Le PC portable de la marque à la poire.', 'https://picsum.photos/seed/1/300/200', 958, 1, 1),
('P00002', 'iFraude', 'Le smartphone phare de la marque à la poire.', 'https://picsum.photos/seed/2/300/200', 1156, 2, 2),
('P00003', 'Deell', 'pc Portable', 'https://picsum.photos/seed/2/300/200', 1213, 3, 2),


('P00002', 'Dell Pasunrond', 'Un ordinateur portable pas cher mais pas top.', 'https://picsum.photos/seed/3/300/200', 521, 1, 2);


INSERT INTO "roles" ("name")
VALUES ('customer'),
('admin');

INSERT INTO "users" ("name", "email", "password", "role_id")
VALUES ('John Example', 'example@example.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 1), 
('Maurice Admin', 'admin@admin.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 2);

COMMIT;
