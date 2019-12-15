import React from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


import Pokemon from '../components/Pokemon';
import { removePokemon } from '../store/actions/myPokemon'

const useStyles = makeStyles({
    emptyPage: {
        textAlign: 'center',
        position: 'absolute',
        top: '50%'
    },
});

const MyPokemon = () => {
    const classes = useStyles();
    const MyPokemonState = useSelector(state => state.myPokemon);
    const dispatch = useDispatch();
    const { pokemonList } = MyPokemonState;

    const onRelease = (index) => {
        dispatch(removePokemon(index));
    }
    return (
        <Container>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={1}>
                    {pokemonList.length <= 0 && (
                        <div className={classes.emptyPage}>
                            <Typography gutterBottom variant="h5" component="h2">
                                You don`t have any pokemon
                            </Typography>
                        </div>
                    )}
                    {pokemonList.length > 0 && pokemonList.map((pokemon, index) => {
                        return (
                            <Grid xs={6} md={4} lg={2} key={pokemon.id + index} item>
                                <Pokemon pokemon={pokemon} onClickRelease={() => onRelease(index)} />
                            </Grid>
                        )
                    })}
                </Grid>
            </Grid>
            
        </Container>
    )
}

MyPokemon.propTypes = {

}

export default MyPokemon;