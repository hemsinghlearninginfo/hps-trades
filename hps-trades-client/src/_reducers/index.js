import { combineReducers } from 'redux';

import { authentication } from './authentication.reducer';
import { registration } from './registration.reducer';
import { forgotpasswordToEmail } from './forgotpasswordtoemail.reducer';
import { users } from './users.reducer';
import { alert } from './alert.reducer';
import { util } from './util.reducer';

const rootReducer = combineReducers({
  authentication,
  registration,
  forgotpasswordToEmail,
  users,
  alert,
  util
});

export default rootReducer;