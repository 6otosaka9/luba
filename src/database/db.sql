CREATE DATABASE lubaDB;

USE lubaDB;

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

CREATE TABLE users(
    id INT(11) NOT NULL,
    room INT(2) NOT NULL,
    userName TEXT,
    userDNI INT(8),
    admin_id INT(11),
    amount INT(255),
    fromv TEXT,
    tov TEXT,
    archivated BOOLEAN,
    joined_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_admin FOREIGN KEY (admin_id) REFERENCES admins(id)
);

ALTER TABLE users
     ADD PRIMARY KEY (id);

ALTER TABLE users
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;