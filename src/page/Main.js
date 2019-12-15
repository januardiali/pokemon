import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { isEmpty } from 'lodash';

import { fetchAllPokemon } from '../store/actions/pokemon';
import Search from '../components/Search';
import Pokemon from '../components/Pokemon';

const useStyles = makeStyles(theme => ({
    main: {
    },
    paper: {
        width: '100%',
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    search: {
        paddingTop: 10,
        marginBottom: 20,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    appBarSpacer: {
        marginTop: 64,
        paddingBottom: 64,
    },
}));

const Main = () => {
    const classes = useStyles();
    const [limit, setLimit] = useState(964);
    const [offset, setOffset] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [pokemonIds, setPokemonIds] = useState([]);
    const { isFetched, collection, count } = useSelector(state => state.pokemon);
    const dispatch = useDispatch();
    let history = useHistory();

    const handleClick = (id) => {
        history.push(`/detail/${id}`);
    }

    useEffect(() => {
        if(!isEmpty(collection)) {
            setPokemonIds(Object.keys(collection));
        } else {
            dispatch(fetchAllPokemon({limit, offset}))
        }
    }, [dispatch, limit, offset, collection]);

    // useEffect(() => {
    //     if(collection) {
    //         setPokemonIds(Object.keys(collection));
    //     }
    // }, [collection]);

    const handleSearch = event => {
        const value = event.target.value.toLowerCase().trim();

        if (value === '') {
            setPokemonIds(Object.keys(collection));
            setSearchQuery(value)
        }
        const newPokemonIds = Object.keys(collection).filter(pokemonId => {
            const pokemon = collection[pokemonId]
      
            return pokemon.name.includes(value)
        })
        setPokemonIds(newPokemonIds);
        setSearchQuery(value)
    }

    const pokemons = pokemonIds.map(pokemonId => {
        const pokemon = collection[pokemonId];
        return (
            <Grid xs={6} md={4} lg={2} item key={pokemon.id}>
                <Pokemon pokemon={pokemon} onClickDetail={() => handleClick(pokemon.id)} />
            </Grid>
        )
    });

    return (
        <Container className={classes.main}>
            {/* {error && <div className="page__error">{error}</div>} */}
            <div className={classes.search}>
                <Search id="search-pokemon" name="searchPokemon" onChange={handleSearch} value={searchQuery} />
            </div>
            {isFetched ? (
                <p>Loading...</p>
            ) : (
                <Grid item xs={12}>
                    <h2>Pokemon owned {count}</h2>
                    <Grid container justify="center" spacing={3}>
                        {pokemons}
                    </Grid>
                </Grid>
            )}
        </Container>
    )
}

export default Main;