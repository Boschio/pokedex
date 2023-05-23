\echo 'Delete and recreate PokeDex db?'
\prompt 'Return for yes or control-C to cancel > ' answer

DROP DATABASE pokedex;
CREATE DATABASE pokedex;
\connect pokedex;

\i pokedex-schema.sql