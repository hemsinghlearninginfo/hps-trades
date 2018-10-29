import { utilConstants } from '../_constants';
import { utilActions } from '../_services';


export const utilActions = {
    isURLValidate
};

function isURLValidate(url) {
    return dispatch => {
        dispatch(request(url));

        utilActions.isURLValidate(url)
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: utilConstants.REQUEST } }
    function success(users) { return { type: utilConstants.SUCCESS, users } }
    function failure(error) { return { type: utilConstants.FAILURE, error } }
}

