import { appConstants, responseConstants } from '../_constants';
import { stockService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';
//import { dataManager } from '../dataManager';

export const stockActions = {
    getMarket,
    addUpdate,
    getAll,
    // getEventTypesByUser,
    // getAllEventsByUser,
    // createByUser,
    // deleteByUser,
};

async function getMarket(){
    try {
        const market = await stockService.getMarket();
        return market;
    }
    catch (error) {
        if (responseConstants.INVALID_TOKEN === error) {
            history.push('/');
            return '';
        }
        else { return error; }
    }
}


function addUpdate(stock) {
    return dispatch => {
        dispatch(request(stock));
        stockService.addUpdate(stock)
            .then(
                stock => {
                    dispatch(success());
                    dispatch(alertActions.success('Stock saved successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(stock) { return { type: appConstants.REQUEST,  stock } }
    function success(stock) { return { type: appConstants.SUCCESS,  stock } }
    function failure(error) { return { type: appConstants.FAILURE, error } }
}

async function getAll(){
    try {
        const stocks = await stockService.getAll();
        return stocks;
    }
    catch (error) {
        if (responseConstants.INVALID_TOKEN === error) {
            history.push('/');
            return '';
        }
        else { return error; }
    }
}

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
