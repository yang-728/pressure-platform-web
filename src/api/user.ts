import request from '../utils/request';


export const login = (body: {
    username: string,
    password: string
}) => {
    return request({
        url: '/user/login',
        method: 'post',
        data: body
    })
}

export const getCurrentUser = () => {
    return request({
        url: '/user/current',
        method: 'get'
    });
}

export const addUser = (body: {
    username: string,
    password: string,
    roleId?: number
}) => {
    return request({
        url: '/user/add',
        method: 'post',
        data: body
    })
}

export const updateUser = (id: number, body: any) => {
    return request({
        url: '/user/update/' + id,
        method: 'post',
        data: body
    });
}

export const getUserList = (param: any) => {
    return request({
        url: '/user/list',
        method: 'get',
        params: param
    });
}

export const deleteUser = (id: number) => {
    return request({
        url: '/user/delete/' + id,
        method: 'get'
    });
}

export const updatePassword = (body: {
    id: number,
    oldPassword: string,
    newPassword: string
}) => {
    return request({
        url: '/user/updatePassword',
        method: 'post',
        data: body
    });
}
