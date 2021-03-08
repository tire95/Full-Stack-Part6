import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE': {
      const votedAnecdote = action.data
      return state.map(anecdote =>
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote)
        .sort((a, b) => b.votes - a.votes)
    }
    case 'ADD': {
      const data = action.data
      return state.concat(data).sort((a, b) => b.votes - a.votes)
    }
    case 'INIT_ANEC': {
      return action.data
    }
    default:
      return state
  }
}

export const addAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'ADD',
      data: newAnecdote,
    })
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.voteAnecdote(id)
    dispatch({
      type: 'VOTE',
      data: votedAnecdote
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANEC',
      data: anecdotes.sort((a, b) => b.votes - a.votes),
    })
  }
}

export default reducer