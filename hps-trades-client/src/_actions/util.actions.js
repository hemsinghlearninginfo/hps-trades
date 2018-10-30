import { utilConstants } from '../_constants';
import { utilService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const utilActions = {
    isURLValidate
};

function isURLValidate(url) {
    return dispatch => {
        dispatch(request(url));

        utilService.isURLValidate(url)
            .then(
                urlResponse => {
                    dispatch(success(urlResponse))
                },
                error => {
                    history.push('/404');
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: utilConstants.REQUEST } }
    function success(users) { return { type: utilConstants.SUCCESS, users } }
    function failure(error) { return { type: utilConstants.FAILURE, error } }
}

