import Image from 'next/image'
import { useState, useEffect } from 'react'

export default function PokeCard({ pokemon }) {
    const pokeInfo = pokemon.url
    const [pokeData, setPokeData] = useState([])

    useEffect(() => {
        const fetchData = async () => {
          const res = await fetch(pokeInfo)
          let resData = await res.json()
    
          if(!res.ok) {
            throw new Error("Failed to fetch data")
          } else {
            setPokeData(resData)
          }
        }
        fetchData()
    }, [pokeInfo]);

    return (
         <>
            <div>
                {pokemon.name}
                <Image src={pokeData?.sprites?.other['official-artwork'].front_default} width={300} height={300} alt={`Picture of ${pokemon.name}`}  />
            </div>
         </>
    )
}