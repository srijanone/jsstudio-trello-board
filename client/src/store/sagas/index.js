import { all } from 'redux-saga/effects';

import { boardsWatcher } from "./board.saga";

export default function* rootSaga(){
	yield all([
		boardsWatcher(),
	])
}