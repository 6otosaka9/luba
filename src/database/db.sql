CREATE DATABASE database_luba;

USE database_luba;

CREATE TABLE admins(
    id INT(13) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
);

ALTER TABLE admins
    ADD PRIMARY KEY (id);

ALTER TABLE admins
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE admins;

CREATE TABLE user(
    id INT(11) NOT NULL,
    number VARCHAR(2) NOT NULL,
    usserName TEXT,
    usserDNI INT(8),
    payed TEXT,
    joined_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (usserDNI) REFERENCES admins(id)
);

ALTER TABLE user
     ADD PRIMARY KEY (id);

ALTER TABLE user
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;