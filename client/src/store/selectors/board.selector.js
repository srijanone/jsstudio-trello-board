import { createSelector } from "reselect";
import { uniq } from 'lodash';
import * as colorArray from '../../utils/colors';

const boardsState = (state) => state.boards;
export const dateRange = createSelector(boardsState, (state) => state.dateRange);
export const lists = createSelector(boardsState, (state) => state.lists);
export const cards = createSelector(boardsState, (state) => state.cards);
export const boards = createSelector(boardsState, (state) => state.allBoards);
export const currentMembers = createSelector(boardsState, (state) => state.currentBoardMembers);

export const allBoards = createSelector(
  boards,
  lists,
  cards,
  dateRange,
  currentMembers,
  (boards, lists, cards, dateRange, currentMembers) => {
  // console.log('currentMembers', currentMembers,'cards',cards)
    let boardsWithLists = boards.map((board) => {
      let boardList = lists
        .filter((list) => list.idBoard === board.id)
        .map((list) => {
          let listCards = cards.filter((card) => card.idList === list.id);
          return { ...list, cards: listCards };
        });
      return { ...board, lists: boardList, dateRange };
    });
    return boardsWithLists;
  }
);

export const listCardGrouping = createSelector(allBoards, (boards) => {
  return boards
  // .filter(b => b.name === "The Apollo" || b.name === "Shoorveer" || b.name === "Avengers")
  .map((board) => {
    let value = {};
    board.lists.map((list) => {
      return (value[list.name] = list.cards.length);
    });
    value.name = board.name;
    return value;
  });
});

export const uniqListWithColors = createSelector(lists, (lists)=> {
  let uniqListNames =  uniq(lists.map(l => l.name))
  return uniqListNames.map((name, index)=>({name: name, color: colorArray[index].hex}))
})
