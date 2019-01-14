import { appConstants, responseConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { emailActions } from './';
import { history } from '../_helpers';


export const userActions = {
    login,
    logout,
    register,
    getAll,
    forgotPasswordToEmail,
    delete: _delete,
    getAllUsermapping,
    getAllWithType,
    addUpdateUserMapping,
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => {
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: appConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: appConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: appConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: appConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        var emailUserObject = { ...user };

        userService.register(user)
            .then(
                user => {
                    dispatch(success());
                    history.push('/');
                    emailActions.emailForNewUserRegistration(emailUserObject);
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: appConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: appConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: appConstants.REGISTER_FAILURE, error } }
}

function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: appConstants.GETALL_REQUEST } }
    function success(users) { return { type: appConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: appConstants.GETALL_FAILURE, error } }
}

function forgotPasswordToEmail(username) {
    return dispatch => {
        dispatch(request(username));
        userService.forgotPasswordToEmail(username)
            .then(
                username => dispatch(success(username)),
                error => {
                    dispatch(failure(username, error.toString()))
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(username) { return { type: appConstants.FORGOTPASSWORD_REQUEST, username } }
    function success(username) { return { type: appConstants.FORGOTPASSWORD_SUCCESS, username } }
    function failure(error) { return { type: appConstants.FORGOTPASSWORD_FAILURE, error } }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: appConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: appConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: appConstants.DELETE_FAILURE, id, error } }
}

async function getAllUsermapping(){
    try {
        const userMappings = await userService.getAllUsermapping();
        return userMappings;
    }
    catch (error) {
        if (responseConstants.INVALID_TOKEN === error) {
            history.push('/');
            return '';
        }
        else { return error; }
    }
}

async function getAllWithType(){
    try {
        return await userService.getAllWithType();
    }
    catch (error) {
        if (responseConstants.INVALID_TOKEN === error) {
            history.push('/');
            return '';
        }
        else { return error; }
    }
}

function addUpdateUserMapping(userMapping) {
    return dispatch => {
        dispatch(request(userMapping));

        userService.addUpdateUserMapping(userMapping)
            .then(
                user => {
                    dispatch(success());
                    dispatch(alertActions.success('User mapping added successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: appConstants.GETALL_REQUEST, user } }
    function success(user) { return { type: appConstants.GETALL_SUCCESS, user } }
    function failure(error) { return { type: appConstants.GETALL_FAILURE, error } }
}