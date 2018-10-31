import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { emails } from './emails.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { generic } from './generic.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  emails,
  users,
  alert,
  generic,
});

export default rootReducer;