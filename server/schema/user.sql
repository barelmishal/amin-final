CREATE TABLE users (
    id int PRIMARY KEY generated always as identity,
    google_id varchar(200) not null UNIQUE,
    email varchar(250) not null,
    first_name varchar(80) not null,
    last_name varchar(80) not null,
    created timestamp not null DEFAULT current_timestamp,
    last_seen timestamp not null DEFAULT current_timestamp
);
