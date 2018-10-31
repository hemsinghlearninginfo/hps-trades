import { emailService } from '../_services';
import { appConstants } from '../_constants';
import { alertActions } from './';
import { history } from '../_helpers';


export const emailActions = {
    isURLValidate,
    emailForNewUserRegistration,
};


function isURLValidate(url) {
    return dispatch => {
        dispatch(request(url));

        emailService.isURLValidate(url)
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

    function request() { return { type: appConstants.REQUEST } }
    function success(users) { return { type: appConstants.SUCCESS, users } }
    function failure(error) { return { type: appConstants.FAILURE, error } }
}



function emailForNewUserRegistration(user) {
    return emailService.emailForNewUserRegistration(user);
}
