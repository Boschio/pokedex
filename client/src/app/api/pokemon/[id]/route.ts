import { NextResponse } from 'next/server'

export async function GET(request: Request, { params }: any) {
    const id = params.id

    return NextResponse.json(`https://pokeapi.co/api/v2/pokemon/${id}/`)
}

