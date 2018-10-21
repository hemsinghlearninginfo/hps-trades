import { userConstants } from '../_constants';

export function forgotpasswordToEmail(state = {}, action) {
  switch (action.type) {
    case userConstants.FORGOTPASSWORD_REQUEST:
      return { forgotpasswording: true };
    case userConstants.FORGOTPASSWORD_SUCCESS:
      return {};
    case userConstants.FORGOTPASSWORD_FAILURE:
      return {};
    default:
      return state
  }
}