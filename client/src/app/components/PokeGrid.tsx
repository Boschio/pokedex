import { Key } from "react"
import PokeCard from "./PokeCard"

export default function PokeGrid({ pokemon } : any) {
    
    return (
         <>
            <div className="flex flex-wrap justify-center">
                {pokemon?.map((pokemon: { name: Key | null | undefined }) => (
                    <PokeCard key={pokemon.name} pokemon={pokemon} />
                ))}
            </div>
         </>
    )
}