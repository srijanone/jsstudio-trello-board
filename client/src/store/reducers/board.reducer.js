import {
  FETCH_ALL_BOARDS_COMPLETE,
  FETCH_ALL_BOARDS_FAIL,
  FETCH_LIST_COMPLETE,
  FETCH_CARD_COMPLETE,
  FETCH_BOARD_MEMBERS_COMPLETE,
  SAVE_DATE,
  SET,
  SET_FILTER
} from "../types/board.type";

const initialState = {
  allBoards: [],
  lists: [],
  cards: [],
  currentBoardMembers: [],
  dateRange: [],
  filter: null
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ALL_BOARDS_COMPLETE:
      return {
        ...state,
        allBoards: [...action.payload],
      };
    case SET_FILTER:
      return { ...state, filter: action.payload};  
    case FETCH_LIST_COMPLETE:
      //return { ...state, lists: [...state.lists, ...action.payload] };
      if (!action.payload.emptyCards) {
        return { ...state, lists: [...state.lists, ...action.payload.lists] };
      } else {
        return { ...state, lists: [] };
      }
    case FETCH_CARD_COMPLETE:
      if (!action.payload.emptyCards) {
        return { ...state, cards: [...state.cards, ...action.payload.cards] };
      } else {
        return { ...state, cards: [] };
      }
      
    case FETCH_BOARD_MEMBERS_COMPLETE:
      return { ...state, currentBoardMembers: action.payload};
    case SAVE_DATE:
      return { ...state, dateRange: action.payload};  
    case FETCH_ALL_BOARDS_FAIL:
    default:
      return state;
  }
}
