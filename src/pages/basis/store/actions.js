import * as constants from './constants';
import axiosInstance from "../../../utils/request";
import { assembleQuery } from "../../../utils/query";
import {Message} from "../../../components/message";


export const changeBases = (bases) => ({
    type: constants.CHANGE_BASES,
    bases
});

export const getBases = (params) => {
    return (dispatch) => {
        axiosInstance.get('/basis?' + assembleQuery(params)
        ).then((response) => {
            let result = response.data;
            if (result) {
                dispatch(changeBases(result));
            }
        })
    }
}

export const getBasis = (id) => {
    return axiosInstance.get('/basis/' + id).then((response) => {
        return response.data;
    }).catch((e) => {
        return {};
    })
}

export const addBasis = (data) => {
    let params = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.post('/basis', params).then((response) => {
        Message.success('add basis success!');
    }).catch((e) => {
        return {};
    })
}

export const updateBasis = (data) => {
    let params = new URLSearchParams();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.put('/basis/' + data.id, params).then((response) => {
        Message.success('update basis success!');
    }).catch((e) => {
        return {};
    })
}


export const deleteBasis = (id) => {
    return axiosInstance.delete('/basis/' + id).then((response) => {
        Message.success('delete basis ' + id + ' success!');
    }).catch((e) => {
        return {};
    })
}