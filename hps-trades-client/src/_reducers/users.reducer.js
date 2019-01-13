import { appConstants } from '../_constants';

export function users(state = {}, action) {
  switch (action.type) {
    case appConstants.GETALL_REQUEST || appConstants.GETALL_USERMAPPING_REQUEST:
      return {
        loading: true
      };
    case appConstants.GETALL_SUCCESS:
      return {
        items: action.users
      };
    case appConstants.GETALL_FAILURE:
      return { 
        error: action.error
      };
    case appConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map(user =>
          user.id === action.id
            ? { ...user, deleting: true }
            : user
        )
      };
    case appConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter(user => user.id !== action.id)
      };
    case appConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user 
      return {
        ...state,
        items: state.items.map(user => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        })
      };
    default:
      return state
  }
}