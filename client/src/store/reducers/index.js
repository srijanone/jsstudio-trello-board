import { combineReducers } from "redux";

import boardsReducer from './board.reducer';

export default combineReducers({
	boards: boardsReducer,
})