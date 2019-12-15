import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import SearchIcon from '@material-ui/icons/Search';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/core/styles';

import usePrevious from '../utils/usePrevious';

const useStyles = makeStyles(theme => ({
    root: {
        width: '100%',
        position: 'fixed',
        bottom: 0,
        display: 'flex',
        [theme.breakpoints.up('md')]: {
          display: 'none',
        },
    },
}));

const Footer = props => {
    const classes = useStyles();
    const history = useHistory();
    const location = useLocation();
    const [value, setValue] = useState(location.pathname);
    const prevLocationPathName = usePrevious(location.pathname);

    useEffect(() => {
        if (location && prevLocationPathName && location.pathname !== prevLocationPathName) {
            setValue(location.pathname)
        }
    }, [location, prevLocationPathName])

    return (
        <BottomNavigation
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                history.push(newValue);
            }}
            showLabels
            className={classes.root}
        >
            <BottomNavigationAction label="Home" value="/" icon={<SearchIcon />} />
            <BottomNavigationAction label="My Pokemon" value="/mypokemon" icon={<FavoriteIcon />} />
        </BottomNavigation>
    )
}

export default Footer;