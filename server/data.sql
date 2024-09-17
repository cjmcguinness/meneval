CREATE DATABASE menevaldb;

CREATE TABLE users (
    email VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);

CREATE TABLE tasks (
    id VARCHAR(255) PRIMARY KEY,
    user_email VARCHAR(255) REFERENCES users(email),
    title VARCHAR(50),
    description VARCHAR(255),
    due_date VARCHAR(300)
);