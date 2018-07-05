import {Map} from 'immutable'

const initialState = {
  board: Map(),
  turn: 'X'
}

const MOVE = 'MOVE'
export const move = (turn, coordinates) => {
  return {
    type: MOVE,
    position: coordinates,
    player: turn
  }
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MOVE:
      return {
        board: state.board.setIn(action.position, action.player),
        turn: state.turn === 'X' ? 'O' : 'X'
      }
  default:
    return state
  }
}
