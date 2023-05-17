
export default function PokeGrid({ pokemon }) {
    return (
         <>
            <div>
                {pokemon?.map(pokemon => (
                    <div key={pokemon.name}>{pokemon.name}</div>
                ))}
            </div>
         </>
    )
}