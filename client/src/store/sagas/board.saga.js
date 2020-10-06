import { takeLatest, call, put, select } from 'redux-saga/effects';
import { getBoards, getLists, getCards, getMembers } from "../../api";
import { fetchAllBoardsCompleteAction, fetchAllBoardsFailAction, fetchListCompleteAction, fetchCardCompleteAction, fetchBoardMembersCompleteAction, saveDateAction } from "../actions/board.action";
import { FETCH_ALL_BOARDS, FETCH_ALL_BOARDS_COMPLETE, FETCH_BOARD_MEMBERS, SAVE_DATE } from "../types/board.type";
import { allBoards } from '../selectors/board.selector';

function* fetchBoards() {
	try {
		let boards = yield call(getBoards, "name,prefs")
		yield put(fetchAllBoardsCompleteAction(boards))
	} catch(e) {
		yield put(fetchAllBoardsFailAction())
	}
}

function* fetchListsInEachBoardAndCards() {
	let boards = yield select(allBoards);
	// console.log('DateRange by saga',boards[0].dateRange)
	let cleared = false;
	yield* boards.map(function* (board){
		let lists = yield call(getLists,"name,idBoard",board.id)
		let cards = yield call(getCards, "", board.id, board.dateRange[0], board.dateRange[1])
		let members = yield call(getMembers, "id,fullName,avatarUrl,initials")
		// console.log('cards saga',cards)
		if (board.dateRange.length && !cleared) {
			// console.log('if dateRange')
			cleared = true;
			yield put (fetchCardCompleteAction({
				cards,
				emptyCards: true,
				members,
			}))
			yield put(fetchListCompleteAction({
				lists,
				emptyCards: true,
				members,
			}))
		}
		yield put (fetchCardCompleteAction({
			cards,
			members
		}))
		yield put(fetchListCompleteAction({
			lists,
			members
		}))
	})
}

function* fetchBoardMembers(action) {
	try {
		let members = yield call(getMembers, "fullName,avatarUrl,initials", action.payload)
		yield put(fetchBoardMembersCompleteAction(members))
	} catch(e) {
		console.error("Error fetching members")
		console.error(e)
	}
}

export function* boardsWatcher() {
	yield takeLatest(FETCH_ALL_BOARDS, fetchBoards)
	yield takeLatest(FETCH_ALL_BOARDS_COMPLETE, fetchListsInEachBoardAndCards)
	yield takeLatest(FETCH_BOARD_MEMBERS, fetchBoardMembers)
	yield takeLatest(SAVE_DATE, saveDateAction)
}