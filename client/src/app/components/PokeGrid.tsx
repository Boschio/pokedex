import PokeCard from "./PokeCard"

export default function PokeGrid({ pokemon }) {
    
    return (
         <>
            <div className="flex flex-wrap justify-center">
                {pokemon?.map(pokemon => (
                    <PokeCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
         </>
    )
}