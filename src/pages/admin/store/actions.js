import * as constants from './constants';
import axiosInstance from "../../../utils/request";
import { assembleQuery } from "../../../utils/query";
import {Message} from "../../../components/message";


export const changeAdmins = (admins) => ({
    type: constants.CHANGE_ADMINS,
    admins
});

export const getAdmins = (params) => {
    return (dispatch) => {
        axiosInstance.get('/admin?' + assembleQuery(params)
        ).then((response) => {
            let result = response.data;
            if (result) {
                dispatch(changeAdmins(result));
            }
        }).catch((e) => {
            return [];
        });
    }
}

export const getAdmin = (id) => {
    return axiosInstance.get('/admin/' + id).then((response) => {
        return response.data;
    }).catch((e) => {
        return {};
    })
}

export const addAdmin = (data) => {
    let params = new FormData();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.post('/admin', params).then((response) => {
        Message.success('add admin success!');
    }).catch((e) => {
        return {};
    })
}

export const updateAdmin = (data) => {
    let params = new URLSearchParams();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.put('/admin/' + data.id, params).then((response) => {
        Message.success('update admin success!');
    }).catch((e) => {
        return {};
    })
}

export const changeAdmin = (data) => {
    let params = new URLSearchParams();
    for (let key in data) {
        if (data.hasOwnProperty(key)) {
            params.append(key, data[key]);
        }
    }
    return axiosInstance.put('/admin/change/' + data.id, params).then((response) => {
        Message.success('change admin password success!');
    }).catch((e) => {
        return {};
    })
}

export const resetAdmin = (id) => {
    return axiosInstance.put('/admin/reset/' + id).then((response) => {
        Message.success('reset admin password success!');
    }).catch((e) => {
        return {};
    })
}

export const deleteAdmin = (id) => {
    return axiosInstance.delete('/admin/' + id).then((response) => {
        Message.success('delete admin ' + id + ' success!');
    }).catch((e) => {
        return {};
    })
}