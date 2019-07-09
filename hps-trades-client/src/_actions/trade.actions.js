import { appConstants, responseConstants } from '../_constants';
import { tradeService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
//import { dataManager } from '../dataManager';

export const tradeActions = {
    getAllRules,
    addUpdateRules,
};

async function getAllRules(){
    try {
        const tradeRules = await tradeService.getAllRules();
        return tradeRules;
    }
    catch (error) {
        if (responseConstants.INVALID_TOKEN === error) {
            history.push('/');
            return '';
        }
        else { return error; }
    }
}


function addUpdateRules(tradeRule) {
    return dispatch => {
        dispatch(request(tradeRule));
        tradeService.addUpdateRules(tradeRule)
            .then(
                rule => {
                    dispatch(success());
                    dispatch(alertActions.success('Trade Rule saved successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(tradeRule) { return { type: appConstants.REQUEST,  tradeRule } }
    function success(tradeRule) { return { type: appConstants.SUCCESS,  tradeRule } }
    function failure(error) { return { type: appConstants.FAILURE, error } }
}

// async function getAll(){
//     try {
//         const tradeRules = await tradeService.getAllRules();
//         return tradeRules;
//     }
//     catch (error) {
//         if (responseConstants.INVALID_TOKEN === error) {
//             history.push('/');
//             return '';
//         }
//         else { return error; }
//     }
// }

// async function getAllEventsByUser(){
//     try {
//         const loggedInUser = dataManager.getCurrentUser()._id;
//         const events = await eventService.getAllEventsByUser(loggedInUser);
//         return events;
//     }
//     catch (error) {
//         if (responseConstants.INVALID_TOKEN === error) {
//             history.push('/');
//             return '';
//         }
//         else { return error; }
//     }
// }

// function createByUser(formEvent) {
//     return dispatch => {
//         dispatch(request(formEvent.heading, formEvent.fromDate, formEvent.toDate));
//         eventService.createByUser(formEvent)
//             .then(
//                 eventCreated => {
//                     dispatch(success());
//                     dispatch(alertActions.success('Event added successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString() + ' Please reload your page.'));
//                 }
//             );
//     };
//     function request(event) { return { type: appConstants.REQUEST, event } }
//     function success(user) { return { type: appConstants.SUCCESS, user } }
//     function failure(error) { return { type: appConstants.FAILURE, error } }
// }

// function deleteByUser(id) {
//     return dispatch => {
//         dispatch(request(id));
//         eventService.deleteByUser(id)
//             .then(
//                 eventCreated => {
//                     dispatch(success());
//                     dispatch(alertActions.success('Event deleted successful'));
//                 },
//                 error => {
//                     dispatch(failure(error.toString()));
//                     dispatch(alertActions.error(error.toString() + ' Please reload your page.'));
//                 }
//             );
//     };
//     function request(event) { return { type: appConstants.REQUEST, event } }
//     function success(user) { return { type: appConstants.SUCCESS, user } }
//     function failure(error) { return { type: appConstants.FAILURE, error } }
// }
