import {Map} from 'immutable'

const initialState = {
  board: Map(),
  turn: 'X',
  winner: null
}

const MOVE = 'MOVE'
export const move = (turn, coordinates) => {
  return {
    type: MOVE,
    position: coordinates,
    player: turn
  }
}

const winner = (board) => {
  if(streak(board, [0, 0], [0, 1], [0, 2]))
  	return streak(board, [0, 0], [0, 1], [0, 2])

  else if (streak(board, [1, 0], [1, 1], [1, 2]))
  	return streak(board, [1, 0], [1, 1], [1, 2])

  else if (streak(board, [2, 0], [2, 1], [2, 2]))
  	return streak(board, [2, 0], [2, 1], [2, 2])

  else if (streak(board, [0, 0], [1, 0], [2, 0]))
  	return streak(board, [0, 0], [1, 0], [2, 0])
  
  else if (streak(board, [0, 1], [1, 1], [2, 1]))
  	return streak(board, [0, 1], [1, 1], [2, 1])

  else if (streak(board, [0, 2], [1, 2], [2, 2]))
  	return streak(board, [0, 2], [1, 2], [2, 2])

  else if (streak(board, [0, 0], [1, 1], [2, 2]))
  	return streak(board, [0, 0], [1, 1], [2, 2])

  else if (streak(board, [0, 2], [1, 1], [2, 0]))
  	return streak(board, [0, 2], [1, 1], [2, 0])
  
  else {
  	for (var i = 0; i < 3; i++) {
  		for (var j = 0; j < 3; j++) {
  			if (!board.hasIn([i, j]))
  				return null
  		}
  	}
  	return "draw"
  }
}

const turnReducer = (turn = 'X', action) => {
	if (action.type === MOVE) {
		return turn === 'X' ? 'O' : 'X'
	}
}

const boardReducer = (board = Map(), action) => {
	if (action.type === MOVE) {
		return board.setIn(action.position, action.player)
	}
}

export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state)
  switch (action.type) {
    case MOVE:
        newState.board = boardReducer(newState.board, action)
        newState.turn = turnReducer(newState.turn, action)
        newState.winner = winner(newState.board)
        return newState
  default:
    return state
  }
}

const streak = (board, firstCoord, ...remainingCoords) => {
	let value = board.getIn(firstCoord)
	for (var i = 0; i < remainingCoords.length; i++) {
		const currentCoord = remainingCoords[i]
		if (board.getIn(currentCoord) !== value) return undefined
	}
	return value
}







