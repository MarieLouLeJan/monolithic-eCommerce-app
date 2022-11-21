-- Deploy ecommerce:seeding to pg

BEGIN;

INSERT INTO "roles" ("title")
VALUES ('customer'),
('admin');

INSERT INTO "users" ("firstname", "lastname", "email", "password", "role_id")
VALUES ('John', 'Example', 'example@example.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 1), 
('Maurice', 'Admin', 'admin@admin.com', '$2b$10$nIIIGWlkm3SzwVF81h4qOekR8ABLUqXoiWAVSkB6oNpKroyyky84G', 2);

INSERT INTO "categories" ("title", "created_by")
VALUES ('Laptop', 2),
('Phone', 2),
('Television', 2),
('Printer', 2);

INSERT INTO "tva" ("title", "value", "created_by")
VALUES ('20%', 0.20, 2), ('10%', 0.10, 2);

INSERT INTO "products" ("ref", "title", "description", "image", "priceHT", "stock", "category_id", "tva_id", "created_by")
VALUES 
('ref-1', 'MacLaptop', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 958, 2, 1, 1, 2),
('ref-2', 'DellusLaptop', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/238118/pexels-photo-238118.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1020, 0, 1, 1, 2),
('ref-3', 'AsusLaptop', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 540, 15, 1, 1, 2),
('ref-4', 'AsusLaptop', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/812264/pexels-photo-812264.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1520, 35, 1, 1, 2),
('ref-5', 'AsusLaptop', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/7974/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 652, 8, 1, 1, 2),
('ref-6', 'MacOther', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam', 'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 4502, 20, 1, 1, 2),
('ref7', 'iFaune', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 250, 3, 2, 2, 2),
('ref8', 'SamSoune', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/163007/phone-old-year-built-1955-bakelite-163007.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 560, 8, 2, 2, 2),
('ref9', 'Lenovu', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/336948/pexels-photo-336948.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1320, 25, 2, 2, 2),
('ref10', 'LGUS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/1786433/pexels-photo-1786433.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 520, 12, 2, 2, 2),
('ref11', 'tel LGUS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 980, 12, 2, 2, 2),
('ref12', 'tel LGUS', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. ', 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 250, 12, 2, 2, 2),
('ref13', 'TV LGusTv', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/333984/pexels-photo-333984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1420, 21, 3, 2, 2),
('ref14', 'TV Hisonse', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/3764958/pexels-photo-3764958.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 560, 2, 3, 2, 2),
('ref15', 'TV Samsoun', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/6976094/pexels-photo-6976094.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 200, 45, 3, 2, 2),
('ref16', 'TV Sonic', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/6977377/pexels-photo-6977377.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 1520, 13, 3, 2, 2),
('ref17', 'TV TCLHJ', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/8058637/pexels-photo-8058637.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 122, 36, 3, 2, 2),
('ref18', 'TV viziococo', ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque doloribus similique debitis magni iure maiores id.', 'https://images.pexels.com/photos/5211580/pexels-photo-5211580.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 530, 2, 3, 2, 2),
('ref19', 'Print siemme', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/4792283/pexels-photo-4792283.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 692, 3, 4, 2, 2),
('ref20', 'Printi asous', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/7218517/pexels-photo-7218517.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 120, 40, 4, 2, 2),
('ref21', 'Samprint', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/7014415/pexels-photo-7014415.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 42, 40, 4, 2, 2),
('ref22', 'Oldprinty', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/5909798/pexels-photo-5909798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 230, 12, 4, 2, 2),
('ref23', 'Smallprinty', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/3570244/pexels-photo-3570244.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 124, 36, 4, 2, 2),
('ref24', 'Smallprinty', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat officiis esse odio, dolore vitae cum itaque deleniti numquam fuga eos explicabo. Reiciendis neque dolori', 'https://images.pexels.com/photos/6956320/pexels-photo-6956320.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 56, 27, 4, 2, 2);

INSERT INTO "product_review" ("product_id", "user_id", "note", "content")
VALUES (1, 1, 4, 'Très bon produit'),
(1, 1, 4, 'Passable');

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
