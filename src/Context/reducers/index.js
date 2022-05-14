import combineReducers from 'react-combine-reducers';

import home from './home';
import more from './more';
import auth from './auth';


const [reducer, initialState] = combineReducers({
  home,
  more,
  auth
});

export {reducer, initialState};
