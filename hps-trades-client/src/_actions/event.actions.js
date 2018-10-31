import { appConstants } from '../_constants';
import { eventService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';


export const eventActions = {
    getAllActiveEventTypes,
};

async function getAllActiveEventTypes() {
    try {
        const eventTypes = await eventService.getAllActiveEventTypes();
        return eventTypes;
    }
    catch (error) {
        return error;
    }
}
