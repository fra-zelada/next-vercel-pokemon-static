import { FC } from "react"

import Head from "next/head"
import { Navbar } from '../ui/Navbar';

interface Props  {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ( { children, title } ) => {
    
    return (
        <>
            <Head>
                <title> { title || 'PokemonApp'} </title>
                <meta name="author" content="Francisco Zelada"/>
                <meta name="description" content="Información sobre el pokemon xxxx" />
                <meta name="keywords" content="xxxx, pokemon, pokedex" />
            
                <meta property="og:title" content={`Información sobre ${ title }`} />
                <meta property="og:description" content={`Eseta es la página sobre ${ title }`} />
                <meta property="og:image" content={ `${ origin}/img/banner.png` } />
            
            </Head>
        
        <Navbar/>
        
        <main style={{
            padding: '0px 20px'
        }} >
            { children }
        </main>
        
        </>
    )
}
