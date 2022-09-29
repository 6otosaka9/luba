CREATE DATABASE database_luba;

USE database_luba;

CREATE TABLE ussers(
    id INT(13) NOT NULL,
    username VARCHAR(16) NOT NULL,
    password VARCHAR(60) NOT NULL,
    fullname VARCHAR(100) NOT NULL
)

ALTER TABLE ussers
    ADD PRIMARY KEY (id);

ALTER TABLE ussers
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;

DESCRIBE ussers;

CREATE TABLE fors(
    id INT(11) NOT NULL,
    number VARCHAR(2) NOT NULL,
    usserFor TEXT,
    usserDNI INT(8),
    payed TEXT,
    created_at timestamp NOT NULL DEFAULT current_timestamp,
    CONSTRAINT fk_user FOREIGN KEY (usserDNI) REFERENCES ussers(id)
);

ALTER TABLE fors
     ADD PRIMARY KEY (id);

ALTER TABLE fors
    MODIFY id INT(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT = 2;