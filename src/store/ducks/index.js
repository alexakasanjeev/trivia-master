import { combineReducers } from 'redux';

import questions from './questions';
import results from './results';

export default combineReducers({
  questions,
  results,
});
