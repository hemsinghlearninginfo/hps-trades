import { appConstants } from '../_constants';
import { dataManager } from '../dataManager';

let user = dataManager.getCurrentUser();
const initialState = user ? { loggedIn: true, user } : {};

export function authentication(state = initialState, action) {
  switch (action.type) {
    case appConstants.LOGIN_REQUEST:
      return {
        loggingIn: true,
        user: action.user
      };
    case appConstants.GETALL_USERMAPPING_REQUEST:
      return {
        loggedIn: true,
        user: action.user
      };
    case appConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user
      };
    case appConstants.LOGIN_FAILURE:
      return {};
    case appConstants.LOGOUT:
      return {};
    default:
      return state
  }
}