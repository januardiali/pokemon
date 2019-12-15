import React from 'react';
import PropTypes from 'prop-types';
import StatusBar from './StatusBar';
import { typesToColors } from '../utils/TypeColors';

const StatusList = props => {
    const { types, stats} = props;
    const statsDefineName = {
        hp: 'HP',
        attack: 'Attack',
        defense: 'Defense',
        speed: 'Speed',
        'special-attack': 'Sp Atk',
        'special-defense': 'Sp Def'
    }
    const color = types.filter(type => type.slot === 1);
    return stats.map(stat => {
        return <StatusBar key={stat.stat.name} color={typesToColors[color[0].type.name]} label={statsDefineName[stat.stat.name]} value={stat.base_stat} max={255}/>
    })
}

StatusList.propTypes = {
    types: PropTypes.array,
    stats: PropTypes.array,
}

export default StatusList;