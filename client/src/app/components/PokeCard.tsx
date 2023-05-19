import Image from 'next/image'
import { useState, useEffect, Suspense } from 'react'

export default function PokeCard({ pokemon }) {
    const [pokeData, setPokeData] = useState([])
    const [pokeData2, setPokeData2] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const pokeInfo = pokemon.url
    const pokeText = `https://pokeapi.co/api/v2/pokemon-species/${pokeData.id}/`

    useEffect(() => {
        setIsLoading(true)
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
    
    useEffect(() => {
        setIsLoading(true)
        const fetchData2 = async () => {
            const res = await fetch(pokeText)
            let resData = await res.json()
      
            if(!res.ok) {
              throw new Error("Failed to fetch data")
            } else {
              setPokeData2(resData.flavor_text_entries)
            }
          }
          fetchData2()
          setIsLoading(false)
    }, [pokeText]);

    console.log(Array?.from(pokeData2)[0])

    
    return (
         <>
         <Suspense fallback={<p>Loading feed...</p>}>
            <div className='w-64 h-[24rem] bg-slate-100 flex flex-col items-center border-1 hover:scale-105 border-slate-500/50 rounded-lg shadow-lg shadow-slate-400/50 hover:shadow-slate-500/50 p-2 m-4'>
                <Image priority={true} src={pokeData ? pokeData?.sprites?.other['official-artwork'].front_default : "../../../public/next.svg"} width={300} height={300} className='border-1 border-slate-500/90 shadow-lg rounded-full object-cover w-[170px] h-[170px] overflow-hidden' alt={`Picture of ${pokemon.name}`}  />
                <h2 className='text-xl text-center'>
                    {pokemon.name}
                    
                </h2>
                <h3 className='text-center'>
                    {"PokeDex # " + pokeData.id}
                </h3>
                <p className='h-[96px] m-1 text-base'>
                    {/* Need to filter pokeData for flavor text only in english */}
                    {!isLoading ? Array?.from(pokeData2)[0]?.flavor_text : ""}
                </p>
            </div>
            </Suspense>
         </>
    )
}