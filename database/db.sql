CREATE DATABASE inventory_db;
USE inventory_db;

CREATE TABLE products(
    id INT(11) NOT NULL,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE category(
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    PRIMARY KEY (id)
);

ALTER TABLE products ADD category_id INT(11) NOT NULL;
ALTER TABLE products ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES category(id);
ALTER TABLE products ADD created_at timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP;
ALTER TABLE products MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE products MODIFY category_id INT(11) NULL;

SELECT id FROM category;

USE inventory_db;
CREATE TABLE users(
    email VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci NOT NULL,
    password VARCHAR(255) NOT NULL COLLATE utf8_unicode_ci
);
ALTER TABLE users ADD id INT(11) NOT NULL;

ALTER TABLE products MODIFY id INT(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE users ADD PRIMARY KEY (id);
ALTER TABLE users MODIFY id INT(11) NOT NULL AUTO_INCREMENT;

