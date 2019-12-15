import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';

import getStatDisplayRatio from '../utils/getStatDisplayRatio';

const useStyles = makeStyles(theme => ({
    statusBarRow: {
        display: 'flex',
        marginTop: 2,
        marginLeft: 2,
    },
    label: {
        flexGrow: 1,
        flexBasis: 0
    },
    statusBar: {
      flexGrow: 2,
      flexBasis: 0,
      position: 'relative',
      background: '#ededed'
    },
    statusBarBg: {
        transformOrigin: 'left',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
    },
    statusBarFg: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        color: '#fff',
    }
}));
  
const StatusBar = ({ label, value, max, color }) => {
    const classes = useStyles();
    return (
        <div className={classes.statusBarRow}>
            <span className={classes.label}>{label}</span>
            <span className={classes.statusBar}>
                <div className={classes.statusBarBg} style={{backgroundColor: `${color}`, transform: `scaleX(${getStatDisplayRatio(value, max)})`}}></div>
                <div className={classes.statusBarFg}>{value}</div>
            </span>
        </div>
    )
}

StatusBar.propTypes = {
    label: PropTypes.string,
    color: PropTypes.string,
    value: PropTypes.number,
    max: PropTypes.number
}

StatusBar.defaultProps = {
    value: 0,
    max: 255
}

export default StatusBar;