import React from 'react';
import PropTypes from 'prop-types';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ArrowBack from '@material-ui/icons/ArrowBack';
import FavoriteIcon from '@material-ui/icons/Favorite';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    arrowButton: {
        marginRight: theme.spacing(2),
    },
    grow: {
        flexGrow: 1
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
          display: 'flex',
        },
    },
    selected: {
        backgroundColor: 'red'
    }
}));
const Header = props => {
    const { title } = props;
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const isNotMainPath = location.pathname !== '/';
    return (
        <AppBar position="fixed">
            <Toolbar>
                {isNotMainPath ? <IconButton edge="start" className={classes.arrowButton} color="inherit" aria-label="menu" onClick={history.goBack}>
                        <ArrowBack />
                </IconButton> : <div />}
                <Typography className={classes.title} variant="h6" noWrap>
                    {title}
                </Typography>
                <div className={classes.grow} />
                <div className={classes.sectionDesktop}>
                <NavLink to="/mypokemon" activeClassName={classes.selected}>
                    <Button
                        startIcon={<FavoriteIcon />}
                    >
                        My Pokemon
                    </Button>
                </NavLink>
                    
                </div>
            </Toolbar>
        </AppBar>
    )
}

Header.propTypes = {
    title: PropTypes.oneOfType([
        PropTypes.node,
        PropTypes.string
    ]).isRequired
}

Header.defaultProps = {
    title: "Pokemon"
}

export default Header;