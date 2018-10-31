import { appConstants } from '../_constants';

export function generic(state = {}, action) {
  switch (action.type) {

    case appConstants.GETALL_REQUEST:
      return { requestLoading : true };
    case appConstants.GETALL_SUCCESS:
      return {};
    case appConstants.GETALL_FAILURE:
      return {};
    
    default:
      return state
  }
}