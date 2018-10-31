import { appConstants } from '../_constants';

export function emails(state = {}, action) {
  switch (action.type) {

    case appConstants.REQUEST:
      return { requestLoading : true };
    case appConstants.SUCCESS:
      return {};
    case appConstants.FAILURE:
      return {};

    case appConstants.FORGOTPASSWORD_REQUEST:
      return { forgotpasswording: true };
    case appConstants.FORGOTPASSWORD_SUCCESS:
      return {};
    case appConstants.FORGOTPASSWORD_FAILURE:
      return {};
    
    default:
      return state
  }
}