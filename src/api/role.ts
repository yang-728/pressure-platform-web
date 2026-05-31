import request from '../utils/request';

export const addRole = (body: any) => {
    return request({
        url: '/role/add',
        method: 'post',
        data: body
    });
}

export const updateRole = (id: number, body: any) => {
    return request({
        url: '/role/update/' + id,
        method: 'post',
        data: body
    });
}

export const deleteRole = (id: number) => {
    return request({
        url: '/role/delete/' + id,
        method: 'get'
    });
}

export const getRoleList = (param: any) => {
    return request({
        url: '/role/list',
        method: 'get',
        params: param
    });
}

export const updateRolePermissions = (id: number, permissions: string[]) => {
    return request({
        url: '/role/updatePermissions/' + id,
        method: 'post',
        data: { permissions }
    });
}

export const getPermissionCatalog = () => {
    return request({
        url: '/role/permissions',
        method: 'get'
    });
}
