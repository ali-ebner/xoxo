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
  const newState = Object.assign({}, state)
  switch (action.type) {
    case MOVE:
        newState.board = newState.board.setIn(action.position, action.player)
        newState.turn = newState.turn === 'X' ? 'O' : 'X'
        return newState

  default:
    return state
  }
}
