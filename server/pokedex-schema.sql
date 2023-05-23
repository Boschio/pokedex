CREATE TABLE users (
    id          SERIAL PRIMARY KEY,
    username    TEXT NOT NULL,
    password    TEXT NOT NULL,
    first_name  TEXT NOT NULL,
    last_name   TEXT NOT NULL,
    created_at  TIMESTAMP NOT NULL DEFAULT NOW(),
    UNIQUE(username)
);

CREATE TABLE fave_pokemon (
    user_id                 INTEGER NOT NULL,
    pokemon_id              INTEGER PRIMARY KEY NOT NULL,
    pokemon_name            TEXT NOT NULL,
    pokemon_desc            TEXT NOT NULL,
    pokemon_image_url       TEXT NOT NULL,
    UNIQUE(pokemon_id),
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
);