import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    useParams,
    useHistory,
} from "react-router-dom";
import { isEmpty } from 'lodash';
import { makeStyles } from '@material-ui/core/styles';
import styled, { keyframes } from 'styled-components';
import _ from 'lodash';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import { red } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { fetchPokemonDetail } from '../store/actions/pokemon';
import { addPokemon } from '../store/actions/myPokemon';
import { typesToColors } from '../utils/TypeColors';
import StatusList from '../components/StatusList';


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const SpinImage = styled.img`
    width: 20;
    height: 20;
    margin: 0 auto;
    display: block;
    animation: ${rotate} 4s linear infinite;
`;
  

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 600,
    margin: '0 auto'
  },
  detailTypes: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  monsterType: {
    color: '#fff',
    borderRadius: 2,
    fontSize: 16,
    fontVariant: 'small-caps',
    fontWeight: 600,
    marginRight: 5,
    padding: '1px 10px 5px',
  },
  details: {
    display: 'flex',
    flexDirection: 'row'
  },
  detailStatus: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
  },
  cover: {
    width: 96,
    height: 96,
    margin: '0 auto',
    display: 'block'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  wrapperStatus: {
    display: 'flex',
    marginTop: 2,
    marginLeft: 2,
    flexDirection: 'row'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    width: 400,
    backgroundColor: theme.palette.background.paper,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2, 4, 3),
  },
  title: {
      textAlign: 'center',
  },
  imageSpin: {
   
  },
}));

const Detail = () => {
    const classes = useStyles();
    const history = useHistory();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { isFetched, detail } = useSelector(state => state.pokemon);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [nickname, setNickName] = useState('');
    useEffect(() => {
        if(id) {
            dispatch(fetchPokemonDetail(id))
        }
    }, [id, dispatch]);

    const handleOpen = () => {
        setOpen(true);
    };
    
    const handleClose = () => {
        setOpen(false);
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * Math.floor(max))
    };

    const catchPokemon = () => {
        setLoading(true);
        setTimeout(() => {
            const value =  getRandomInt(100);
            if (value > 50) {
                setSuccess(true);
            }
            handleOpen();
            setLoading(false);
        }, 2000);
    }

    const handleChange = event => {
        setNickName(event.target.value)
    };

    const onCancel = () => {
        dispatch(addPokemon(detail));
        handleClose();
        history.goBack();
    }

    const onSubmit = () => {
        const data = {...detail}
        if(nickname !== '') {
            _.set(data, 'name', nickname)
        }
        
        dispatch(addPokemon(data));
        handleClose();
        history.goBack();
    }
    
    const color = !_.isEmpty(detail) && detail.types.filter(type => type.slot === 1);

    return (
        <Container>
            {!isFetched && isEmpty(detail) ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <Card className={classes.card}>
                        <CardHeader
                            avatar={
                            <Avatar aria-label="recipe" style={{background: typesToColors[color[0].type.name]}}>
                                {detail.id}
                            </Avatar>
                            }
                            title={detail.name}
                            subheader={
                                <div className={classes.detailTypes}>
                                    {detail.types.map(type => (
                                        <div key={type.slot} className={classes.monsterType} style={{background: typesToColors[type.type.name]}}>{type.type.name}</div>
                                    ))}
                                </div>
                            }
                        />
                        <div className={classes.details}>
                            <CardMedia
                                className={classes.cover}
                                image={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                        id
                                        }.png`}
                                title={detail.name}
                            />
                                <div className={classes.detailStatus}>
                                        
                                <CardContent>
                                    <StatusList types={detail.types} stats={detail.stats}/>
                                </CardContent>
                                    
                                </div>
                        </div>
                        <CardActions>
                            <Button size="small" onClick={catchPokemon}>Catch</Button>
                        </CardActions>
                    </Card>
                    <Modal
                        className={classes.modal}
                        open={loading}
                        closeAfterTransition
                        disableBackdropClick
                    >
                        <SpinImage src={require('../static/pokeball.svg')}  /> 
                    </Modal>
                    <Dialog 
                        open={open} 
                        onClose={handleClose} 
                        aria-labelledby="form-dialog-title"
                        disableBackdropClick
                    >
                        <DialogContent>
                            <div>
                                <h2 className={classes.title}>{!success ? 'Pokemon Run away' : 'You`ve caught'}</h2>
                                {!success ? <h1 style={{ textAlign: 'center'}}>:(</h1> :
                                <>
                                <img 
                                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
                                        id
                                        }.png`} className={classes.cover} />
                                <p style={{ textAlign: 'center'}}>{`Would you like to give ${detail.name} a nickname?`}</p>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="name"
                                    value={nickname}
                                    label="Nickname"
                                    type="email"
                                    fullWidth
                                    onChange={handleChange}
                                />
                                </>}
                            </div>
                        </DialogContent>
                        <DialogActions>
                            {!success ? <Button onClick={handleClose} color="primary">
                                Try Again
                            </Button> : (
                                <>
                                    <Button onClick={handleClose} color="primary" onClick={onCancel}>
                                        Cancel
                                    </Button>
                                    <Button onClick={handleClose} color="primary" onClick={onSubmit}>
                                        Submit
                                    </Button>
                                </>
                            )}
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </Container>
    )
};

export default Detail;