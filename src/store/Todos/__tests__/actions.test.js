import * as todos from '../actions'

describe('Todos actions', () => {
  it('addTodo must include text', () => {
    expect(todos.addTodo('welcome')).toEqual({
      type: 'add todo',
      payload: 'welcome'
    })
  })

  it('deleteTodo must include id', () => {
    expect(todos.deleteTodo(1)).toEqual({
      type: 'delete todo',
      payload: 1
    })
  })

  it('editTodo must include id and text', () => {
    expect(todos.editTodo({id: 1, text: 'changed'})).toEqual({
      type: 'edit todo',
      payload: {
        id: 1,
        text: 'changed'
      }
    })
  })

  it('completeTodo must include id', () => {
    expect(todos.completeTodo(1)).toEqual({
      type: 'complete todo',
      payload: 1
    })
  })

  it('completeAll must only include type', () => {
    expect(todos.completeAll()).toEqual({
      type: 'complete all'
    })
  })

  it('clearCompleted must only include type', () => {
    expect(todos.clearCompleted()).toEqual({
      type: 'clear completed'
    })
  })
})
