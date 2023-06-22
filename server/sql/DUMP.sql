-- Create sequence for table
CREATE SEQUENCE users_id_seq
    START WITH 1
    INCREMENT BY 1;

-- Create users table
CREATE TABLE users
(
    id     int
        PRIMARY KEY DEFAULT nextval('users_id_seq'),
    email  text,
    number int
);

-- Insert hardcore data
INSERT INTO users (email, number)
VALUES ('jim@gmail.com', 221122),
     ('jam@gmail.com', 830347),
    ('jim@gmail.com', 221122),
    ('jim@gmail.com', 349425),
    ('jim@gmail.com', 141424),
    ('jim@gmail.com', 822287),
    ('jim@gmail.com', 822286);

-- Select data EMAIL & NUMBER
SELECT * FROM users
WHERE email = 'example-email' AND number = 0000

-- Select data EMAIL
SELECT * FROM users
WHERE email = 'example-email'