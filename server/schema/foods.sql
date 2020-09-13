CREATE TABLE foods (
    id int PRIMARY KEY generated always as identity,
    fdc_id int UNIQUE,
    item_description text
    -- CONSTRAINT fk_food_user FOREIGN KEY(user_id) REFERENCES users(id)
);

