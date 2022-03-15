import { Button, Card, Container, Grid, Image, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { GetStaticPaths } from 'next';
import { GetStaticProps } from 'next'
import { useState } from 'react';
import { pokeApi } from '../../api';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse } from '../../interfaces';
import { SmallPokemon } from '../../interfaces/pokemon-list';
import { getPokemonInfo, localFavorites } from '../../utils';

const PokemonByNamePage = ( { pokemon } : any) => {


    const [isInFavorites, setIsInFavorites] = useState( localFavorites.existInFavorites( pokemon.id ) )

    const onToggleFavorite = () => {
        localFavorites.toggleFavorite( pokemon.id );
        setIsInFavorites( !isInFavorites );

        if (!isInFavorites)
        {
            confetti({
                zIndex: 999,
                particleCount: 100,
                spread: 160,
                angle: -100,
                origin:{
                    x: 1,
                    y: 0
                }
            })            
        }

    }
    


    return (
        <Layout title={ pokemon.name }>

            <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
                <Grid xs={ 2 } sm= {4 } >
                    <Card hoverable css={{ padding: '30px'}}>
                        <Card.Body>
                            <Card.Image 
                                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}
                                alt={ pokemon.name }
                                width="100%"
                                height={200}
                            />
                        </Card.Body>
                    </Card>

                </Grid>

            <Grid xs={12} sm={ 8 }>
                <Card>
                    <Card.Header css={{ display: 'flex', justifyContent : 'space-between'}}>
                        <Text h1 transform="capitalize" >{ pokemon.name} </Text>
                        <Button
                            color={"gradient"}
                            ghost={ !isInFavorites }
                            onClick={onToggleFavorite}
                        >
                            { !isInFavorites ? 'Guardar en favoritos' : 'En Favoritos' }
                        </Button>

                    </Card.Header>

                    <Card.Body>
                        <Text size={30}>Sprites:</Text>
                        <Container direction="row" display="flex" >
                            <Image 
                                src={ pokemon.sprites.front_default }
                                alt={ pokemon.name }
                                width={100}
                                height={100}
                            />
                            <Image 
                                src={ pokemon.sprites.back_default }
                                alt={ pokemon.name }
                                width={100}
                                height={100}
                            />
                            <Image 
                                src={ pokemon.sprites.front_shiny }
                                alt={ pokemon.name }
                                width={100}
                                height={100}
                            />
                            <Image 
                                src={ pokemon.sprites.back_shiny }
                                alt={ pokemon.name }
                                width={100}
                                height={100}
                            />
                        </Container>
                    </Card.Body>

                </Card>
            </Grid>

            </Grid.Container>

        </Layout>
    )
}


export const getStaticPaths: GetStaticPaths = async (ctx) => {
    const { data }  = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151')

    //const pokemonNames:SmallPokemon[] = data.results
    
    const pokemonNames: string[] = data.results.map( pokemon => pokemon.name);

    return {
        // paths:  
        //     pokemones.map(name => ( {params: {name}} ) ),
            paths: pokemonNames.map( name => ({
                params: {name}
            })),
        // paths: [
        //     {
        //         params: {
        //             nombre: 'cachupin'
        //         }
        //     }
        // ],
        fallback: false
    }
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps = async ({ params }) => {
    //const { data } = await  // your fetch function here 

    const { name } = params as {name: string};

    return {
        props: {
            pokemon: await getPokemonInfo( name )
        }
    }
}

export default PokemonByNamePage
