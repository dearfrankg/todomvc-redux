import reducer from '../reducer'
import * as todos from '../actions'

describe('Todos reducer', () => {
  it('should handle initial state', () => {
    expect(
      reducer(
        undefined,
        {}
      )
    ).toEqual([
      { id: 0, text: 'use redux', completed: false }
    ])
  })

  it('should handle addTodo', () => {
    // adds when empty array
    expect(
      reducer(
        [],
        { type: todos.addTodo, payload: 'Run the tests', }
      )
    ).toEqual([
      { id: 0, text: 'Run the tests', completed: false }
    ])

    // adds when one item in array
    expect(
      reducer(
        [
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.addTodo, payload: 'Run the tests' }
      )
    ).toEqual([
      { text: 'Run the tests', completed: false, id: 1 },
      { text: 'Use Redux', completed: false, id: 0 }
    ])

    // adds when two items in array
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: false, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.addTodo, payload: 'Fix the tests' }
      )
    ).toEqual([
      { text: 'Fix the tests', completed: false, id: 2 },
      { text: 'Run the tests', completed: false, id: 1 },
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should handle deleteTodo', () => {
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: false, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.deleteTodo, payload: 1 }
      )
    ).toEqual([
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should handle editTodo', () => {
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: false, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.editTodo, payload: {text: 'Fix the tests', id: 1} }
      )
    ).toEqual([
      { text: 'Fix the tests', completed: false, id: 1 },
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should handle completeTodo', () => {
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: false, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.completeTodo, payload: 1 }
      )
    ).toEqual([
      { text: 'Run the tests', completed: true, id: 1 },
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should handle completeAll', () => {
    // mark all todos since not allMarked
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: true, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.completeAll }
      )
    ).toEqual([
      { text: 'Run the tests', completed: true, id: 1 },
      { text: 'Use Redux', completed: true, id: 0 }
    ])

    // Unmark all todos since allMarked
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: true, id: 1 },
          { text: 'Use Redux', completed: true, id: 0 }
        ],
        { type: todos.completeAll }
      )
    ).toEqual([
      { text: 'Run the tests', completed: false, id: 1 },
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should handle clearCompleted', () => {
    expect(
      reducer(
        [
          { text: 'Run the tests', completed: true, id: 1 },
          { text: 'Use Redux', completed: false, id: 0 }
        ],
        { type: todos.clearCompleted }
      )
    ).toEqual([
      { text: 'Use Redux', completed: false, id: 0 }
    ])
  })

  it('should not generate duplicate ids after clearCompleted', () => {
    expect(
      [
        { type: todos.completeTodo, payload: 0 },
        { type: todos.clearCompleted },
        { type: todos.addTodo, payload: 'Write more tests' }
      ].reduce(reducer, [
        { id: 0, completed: false, text: 'Use Redux' },
        { id: 1, completed: false, text: 'Write tests' }
      ])
    ).toEqual([
      { text: 'Write more tests', completed: false, id: 2 },
      { text: 'Write tests', completed: false, id: 1 }
    ])
  })
})
