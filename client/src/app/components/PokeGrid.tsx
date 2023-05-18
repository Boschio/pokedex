import PokeCard from "./PokeCard"

export default function PokeGrid({ pokemon }) {
    
    return (
         <>
            <div>
                {pokemon?.map(pokemon => (
                    <PokeCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
         </>
    )
}