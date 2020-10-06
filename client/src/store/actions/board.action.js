import {
	FETCH_ALL_BOARDS,
	FETCH_ALL_BOARDS_FAIL,
	FETCH_ALL_BOARDS_COMPLETE,
	FETCH_LIST_COMPLETE,
	FETCH_CARD_COMPLETE,
	FETCH_BOARD_MEMBERS,
	FETCH_BOARD_MEMBERS_COMPLETE,
	SAVE_DATE,
	SET_FILTER
} from "../types/board.type";

export const saveDateAction = (payload) => (
	{
		type: SAVE_DATE,
		payload

	}
)

export const fetchAllBoardsAction = () => (
	{
		type: FETCH_ALL_BOARDS
	}
)

export const fetchAllBoardsCompleteAction = (payload) => (
	{
		type: FETCH_ALL_BOARDS_COMPLETE,
		payload
	}
)

export const fetchAllBoardsFailAction = () => (
	{
		type: FETCH_ALL_BOARDS_FAIL
	}
)

export const fetchListCompleteAction = (payload) => ({
	type: FETCH_LIST_COMPLETE,
	payload
})

export const fetchCardCompleteAction = (payload) => ({
	type: FETCH_CARD_COMPLETE,
	payload
})

export const fetchBoardMembersAction = (id) => ({
	type: FETCH_BOARD_MEMBERS,
	payload: id
})

export const fetchBoardMembersCompleteAction = (payload) => ({
	type: FETCH_BOARD_MEMBERS_COMPLETE,
	payload
})

export const setFilter = payload => ({
	type: SET_FILTER,
	payload
})