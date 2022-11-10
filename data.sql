-- Deploy ecommerce:seeding to pg
-- Deploy ecommerce:structure to pg

BEGIN; 


CREATE TABLE "roles" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL UNIQUE,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "adress_types" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()

);

CREATE TABLE "users" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname"         TEXT NOT NULL,
    "lastname"          TEXT NOT NULL,
    "email"             TEXT NOT NULL UNIQUE,
    "password"          TEXT NOT NULL,
    "role_id"           INTEGER NOT NULL REFERENCES roles("id"),
    "active"            BOOLEAN NOT NULL DEFAULT true,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "adresses" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "entitled"          TEXT NOT NULL, 
    "number"            INTEGER NOT NULL,
    "number_complement" TEXT,
    "street"            TEXT NOT NULL,
    "postal_code"       INTEGER NOT NULL,
    "city"              TEXT NOT NULL,
    "country"           TEXT NOT NULL,
    "complement"        TEXT,
    "active"            BOOLEAN NOT NULL DEFAULT true,
    "user_id"           INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "categories" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL UNIQUE,
    "active"            BOOLEAN NOT NULL DEFAULT true,
    "created_by"        INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "tva" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL UNIQUE,
    "value"             FLOAT NOT NULL,
    "active"            BOOLEAN NOT NULL DEFAULT true,
    "created_by"        INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "products" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ref"               TEXT NOT NULL UNIQUE,
    "title"             TEXT NOT NULL,
    "description"       TEXT NOT NULL,
    "image"             TEXT NOT NULL,
    "priceHT"           FLOAT NOT NULL,
    "active"            BOOLEAN NOT NULL DEFAULT true,
    "category_id"       INTEGER NOT NULL REFERENCES categories("id"),
    "tva_id"            INTEGER NOT NULL REFERENCES tva("id"),
    "created_by"        INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "order_states" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT UNIQUE NOT NULL,
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE "orders" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "totalHT"           FLOAT NOT NULL,
    "tax"               FLOAT NOT NULL,
    "totalTTC"          FLOAT NOT NULL,
    "quantity"          INT NOT NULL NOT NULL,
    "user_id"           INTEGER NOT NULL REFERENCES users("id"),
    "order_states_id"   INTEGER NOT NULL REFERENCES order_states("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "order_type_adress" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "order_id"         INTEGER NOT NULL REFERENCES orders("id"),
    "adress_id"         INTEGER NOT NULL REFERENCES adresses("id"),
    "adress_type_id"    INTEGER NOT NULL REFERENCES adress_types("id")
);



CREATE TABLE "order_product" (
    "product_id"        INTEGER NOT NULL REFERENCES products("id"),
    "order_id"          INTEGER NOT NULL REFERENCES orders("id"),
    "quantity"          INTEGER NOT NULL,
    "priceHT"           FLOAT NOT NULL,
    "TVA"               TEXT NOT NULL,
    "priceTTC"          FLOAT NOT NULL
);


COMMIT;




BEGIN;

INSERT INTO "roles" ("title")
VALUES ('customer'),
('admin');

INSERT INTO "users" ("firstname", "lastname", "email", "password", "role_id")
VALUES ('John', 'Example', 'example@example.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 1), 
('Maurice', 'Admin', 'admin@admin.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 2);

INSERT INTO "categories" ("title", "created_by")
VALUES ('Laptop', 2),
('Mobile', 2),
('Coucou', 2),
('categorie-vide', 2);

INSERT INTO "tva" ("title", "value", "created_by")
VALUES ('20%', 0.20, 2), ('10%', 0.10, 2);

INSERT INTO "products" ("ref", "title", "description", "image", "priceHT", "category_id", "tva_id", "created_by")
VALUES ('123AAAAA', 'Macbroke', 'Le PC portable de la marque à la poire.', 'https://picsum.photos/seed/1/300/200', 958, 1, 1, 2),
('134BBBBB', 'iFraude', 'Le smartphone phare de la marque à la poire.', 'https://picsum.photos/seed/2/300/200', 1156, 2, 2, 2),
('123CCCCC', 'Deell', 'pc Portable', 'https://picsum.photos/seed/2/300/200', 1213, 3, 2, 2),
('123DDDDD', 'Dell Pasunrond', 'Un ordinateur portable pas cher mais pas top.', 'https://picsum.photos/seed/3/300/200', 521, 1, 2, 2);

INSERT INTO "adress_types" ("title")
VALUES ('shipping'),
('billing');

INSERT INTO "order_states" ("title")
VALUES ('en attente de paiement'),
('en cours de livraison'),
('livrée'),
('annulée'),
('en attente du retour'),
('en attente de remboursement'),
('remboursée');




COMMIT;


-- Revert ecommerce:structure from pg

BEGIN;

DROP TABLE "order_type_adress", "order_product", "roles", "adress_types", "users", "adresses", "categories", "tva", "products", "order_states", "orders";

COMMIT;
