import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import formatText from '../utils/formatText';

const useStyles = makeStyles(theme => ({
    card: {
        maxWidth: 600,
        minWidth: 170,
    },
    image: {
        width: 95,
        height: 95,
        margin: '0 auto',
    },
    cardAction: {
        justifyContent: 'center',
    },
}));
const Pokemon = memo(({ pokemon, onClickDetail, onClickRelease }) => {
    const classes = useStyles();
    const { id, name } = pokemon;
    return (
        <Card className={classes.card}>
            <CardActionArea className="detail" onClick={onClickDetail}>
                <CardMedia
                    className={classes.image}
                    image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                    title={name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="h2" align="center">
                        {formatText.capitalize(name)}
                    </Typography>
                </CardContent>
            </CardActionArea>
            {onClickRelease && <CardActions className={classes.cardAction}>
                <Button className="release" size="small" color="primary" onClick={onClickRelease}>
                    Release
                </Button>
            </CardActions>
            }
        </Card>
        
    )
});

Pokemon.propTypes = {
    pokemon: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number,
    }),
    onClickDetail: PropTypes.func,
    onClickRelease: PropTypes.func,
}

export default Pokemon;