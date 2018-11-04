//import config  from 'config';
import { authHeader } from '../_helpers';
import { myConfig } from '../config' ;
import { commonService } from './';
import {dataManager} from '../dataManager';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getById,
    update,
    forgotPasswordToEmail,
    delete: _delete
};

function login(username, password) {

    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    };

    return fetch(myConfig.ApiUrl + 'users/authenticate', requestOptions)
        .then(commonService.handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                dataManager.setCurrentUser(user);
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    dataManager.logoutUser();
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(myConfig.ApiUrl + 'users', requestOptions).then(commonService.handleResponse);
}

function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(myConfig.ApiUrl + `users/${id}`, requestOptions).then(commonService.handleResponse);
}

function forgotPasswordToEmail(username) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(username)
    };
    return fetch(myConfig.ApiUrl + 'users/forgotpasswordtoemail', requestOptions).then(commonService.handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };
    return fetch(myConfig.ApiUrl + 'users/register', requestOptions).then(commonService.handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(myConfig.ApiUrl + 'users/' + user.id, requestOptions).then(commonService.handleResponse);
}


// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(myConfig.ApiUrl + 'users/' +  id, requestOptions).then(commonService.handleResponse);
}

// function handleResponse(response) {
//     return response.text().then(text => {
//         const data = text && JSON.parse(text);
//         if (!response.ok) {
//             if (response.status === 401) {
//                 // auto logout if 401 response returned from api
//                 logout();
//                 window.location.reload(true);
//             }

//             const error = (data && data.message) || response.statusText;
//             return Promise.reject(error);
//         }

//         return data;
//     });
// }