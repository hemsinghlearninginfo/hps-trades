import { utilConstants } from '../_constants';

export function util(state = {}, action) {
  switch (action.type) {
    case utilConstants.REQUEST:
      return {
        utilLoading: true
      };
    case utilConstants.SUCCESS:
      return {
        utilItems: action.users
      };
    case utilConstants.FAILURE:
      return {
        utilError: action.error
      };
    default:
      return state
  }
}