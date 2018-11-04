import { dataManager } from '../dataManager'

export function authHeader() {
    // return authorization header with jwt token
    let user = dataManager.getCurrentUser();

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}

export function authHeaderAppJson() {
    // return authorization header with jwt token
    let user = dataManager.getCurrentUser();

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token, 'Content-Type':'application/json' };
    } else {
        return {};
    }
}

