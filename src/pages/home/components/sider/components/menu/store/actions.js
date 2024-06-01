import * as constants from './constants';


const parseTrail = (trail) => {
    let tmpIds = trail.split('_');
    let ids = [];
    for (let i = 1; i < tmpIds.length; i++) {
        ids.push(parseInt(tmpIds[i]));
    }
    return ids;
}


export const changeSelected = (trail) => {
    return {
        type: constants.CHANGE_SELECTED,
        ids: parseTrail(trail)
    }
};
