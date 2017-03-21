import { handleActions } from 'redux-actions'
import * as todos from './actions'

const initialState = [
  {
    id: 0,
    text: 'use redux',
    completed: false
  }
]

const todosReducer = handleActions({
  [todos.addTodo]: (state, action) => [
    {
      id: state.reduce((maxId, todo) => Math.max(maxId, todo.id), -1) + 1,
      text: action.payload,
      completed: false
    },
    ...state
  ],

  [todos.deleteTodo]: (state, action) =>
    state.filter(todo => todo.id !== action.payload)
  ,

  [todos.editTodo]: (state, action) =>
    state.map(todo => todo.id !== action.payload.id ? todo : {...todo, text: action.payload.text})
  ,

  [todos.completeTodo]: (state, action) =>
    state.map(todo => todo.id !== action.payload ? todo : {...todo, completed: !todo.completed})
  ,

  [todos.completeAll]: (state, action) => {
      const allAreMarked = state.every(todo => todo.completed)
      return state.map(todo => ({...todo, completed: !allAreMarked}))
  },

  [todos.clearCompleted]: (state, action) =>
    state.filter(todo => !todo.completed)
  ,
}, initialState)

// BUG WORKAROUND: (https://goo.gl/WkZrG4)
// when no action.type it triggers a random action
const reducer = (state = initialState, action) => {
  if (!action.type) {
    return state
  }
  return todosReducer(state, action)
}

export default reducer
