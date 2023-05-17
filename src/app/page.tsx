"use client";

import Image from 'next/image'
import { useState, useEffect } from 'react'
import PokeGrid from './components/PokeGrid';

export default function Home() {
  const limit = 100
  const [offset, setOffset] = useState(0)
  const [apiLink, setApiLink] = useState(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`);
  const [pokemon, setPokemon] = useState([])

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(apiLink)
        let resData = await res.json()
  
        if(!res.ok) {
          throw new Error("Failed to fetch data")
        } else {
          setPokemon(resData.results)
        }
        console.log("TEST",resData.results)
      }
      fetchData()
    }, [apiLink]);

  function nextPage() {
    let link = apiLink
    if(offset < 1200) {
      setApiLink(link.replace(`offset=${offset}`, `offset=${offset + limit}`))
      setOffset(offset + limit);
    }
  }

  function prevPage() {
    let link = apiLink
    if (offset > 0) {
      setApiLink(link.replace(`offset=${offset}`, `offset=${offset - limit}`))
      setOffset(offset - limit);
    }
  }
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1>PokeDex</h1>
      <button onClick={prevPage}>Prev Page</button>
      <button onClick={nextPage}>Next Page</button>
      <div>
        <PokeGrid pokemon={pokemon} />
      </div>
    </main>
  )
}
