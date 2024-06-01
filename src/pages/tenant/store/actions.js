import * as constants from './constants';
import axiosInstance from "../../../utils/request";
import { assembleQuery } from "../../../utils/query";
import {Message} from "../../../components/message";


export const changeTenants = (tenants) => ({
    type: constants.CHANGE_TENANTS,
    tenants
});

export const getTenants = (params) => {
    return (dispatch) => {
        axiosInstance.get('/tenant?' + assembleQuery(params)
        ).then((response) => {
            let result = response.data;
            if (result) {
                dispatch(changeTenants(result));
            }
        })
    }
}

export const getTenant = (id) => {
    return axiosInstance.get('/tenant/' + id).then((response) => {
        return response.data;
    }).catch((e) => {
        return {};
    })
}

export const addTenant = (data) => {
    let params = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.post('/tenant', params).then((response) => {
        Message.success('add tenant success!');
    }).catch((e) => {
        return {};
    })
}

export const updateTenant = (data) => {
    let params = new URLSearchParams();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.put('/tenant/' + data.id, params).then((response) => {
        Message.success('update tenant success!');
    }).catch((e) => {
        return {};
    })
}


export const deleteTenant = (id) => {
    return axiosInstance.delete('/tenant/' + id).then((response) => {
        Message.success('delete tenant ' + id + ' success!');
    }).catch((e) => {
        return {};
    })
}