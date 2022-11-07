-- Deploy ecommerce:structure to pg

BEGIN; 


CREATE TABLE "roles" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"              TEXT NOT NULL UNIQUE,
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
    "active"            BOOLEAN NOT NULL,
    "user_id"           INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "categories" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"              TEXT NOT NULL UNIQUE,
    "created_by"        INTEGER NOT NULL REFERENCES users("id"),
    "created_at"        TIMESTAMPTZ NOT NULL DEFAULT NOW()
);


CREATE TABLE "tva" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title"             TEXT NOT NULL UNIQUE,
    "value"             FLOAT NOT NULL,
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


CREATE TABLE "adress_type_adress" (
    "id"                INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "adress_id"         INTEGER NOT NULL REFERENCES adresses("id"),
    "adress_type_id"    INTEGER NOT NULL REFERENCES adress_types("id")
);


CREATE TABLE "order_adress_type" (
    "order_id"              INTEGER NOT NULL REFERENCES orders("id"),
    "adress_type_adress_id" INTEGER NOT NULL REFERENCES adress_type_adress("id")
);


CREATE TABLE "order_product" (
    "product_id"        INTEGER NOT NULL REFERENCES products("id"),
    "order_id"          INTEGER NOT NULL REFERENCES orders("id"),
    "quantity"          INTEGER NOT NULL,
    "priceHT"           FLOAT NOT NULL,
    "tva"               TEXT NOT NULL
);


COMMIT;

