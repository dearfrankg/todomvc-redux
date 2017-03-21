import React from 'react'
import { mount } from 'enzyme'
import MainSection from '../MainSection'
import TodoItem from '../TodoItem'
import Footer from '../Footer'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../constants/TodoFilters'

describe('MainSection Component', (Component = MainSection) => {
  let props
  let mountedComponent
  const getComponent = () => {
    if (!mountedComponent) {
      mountedComponent = mount( <Component {...props} /> )
    }
    return mountedComponent
  }

  beforeEach(() => {
    props = {
      todos: [
        {
          text: 'Use Redux',
          completed: false,
          id: 0
        }, {
          text: 'Run the tests',
          completed: true,
          id: 1
        }
      ],
      actions: {
        editTodo: jest.fn(),
        deleteTodo: jest.fn(),
        completeTodo: jest.fn(),
        completeAll: jest.fn(),
        clearCompleted: jest.fn()
      }
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      const main = getComponent().find('.main')
      expect(main.type()).toBe('section')

      const toggleAll = main.children().at(0)
      expect(toggleAll.type()).toBe('input')

      const todoList = main.children().at(1)
      expect(todoList.type()).toBe('ul')

      const todoItems = todoList.children()
      expect(todoItems.at(0).type()).toBe(TodoItem)

      const footer = main.children().at(2)
      expect(footer.type()).toBe(Footer)
    })

    it('should render filtered todo list for all filters', () => {
      const filtersArray = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
      filtersArray.forEach((filter, i) => {
        getComponent().instance().handleSetFilter(filter)
        const todoList = getComponent().find('.todo-list')
        expect(todoList.children().length).toBe(i === 0 ? 2 : 1)
        // checking the TodoItem todo prop and match against props.todos
        if (filter !== SHOW_ALL) {
          expect(todoList.children().at(0).props().todo)
            .toEqual(i === 1 ? props.todos[0] : props.todos[1])
        }
      })
    })

    describe('when we have todos', () => {
      // we have 2 todos setup in beforeEach
      it('should render toggle-all checkbox', () => {
        expect(getComponent().find('.toggle-all').length).toBe(1)
      })
      it('should render footer', () => {
        expect(getComponent().find('.footer').length).toBe(1)
      })
    })

    describe('when we have no todos', () => {
      beforeEach(() => {
        props.todos = []
      })

      it('should not render toggle-all checkbox', () => {
        expect(getComponent().find('.toggle-all').length).toBe(0)
      })
      it('should not render footer', () => {
        expect(getComponent().find('.footer').length).toBe(0)
      })
    })

    describe('when all todos are completed', () => {
      beforeEach(() => {
        props.todos = [
          { id: 0, text: 'Use Redux', completed: true },
          { id: 1, text: 'Run the tests', completed: true }
        ]
      })

      it('should render toggle-all checkbox checked', () => {
        expect(getComponent().find('.toggle-all').props().checked).toBe(true)
      })
    })

    describe('when all todos are not completed', () => {
      beforeEach(() => {
        props.todos = [
          { id: 0, text: 'Use Redux', completed: false },
          { id: 1, text: 'Run the tests', completed: true }
        ]
      })

      it('should render toggle-all checkbox unchecked', () => {
        expect(getComponent().find('.toggle-all').props().checked).toBe(false)
      })
    })
  })


  describe('function prop calls', () => {
    describe('when clicking toggle-all', () => {
      it('should call completeAll', () => {
        getComponent().find('.toggle-all').simulate('change')
        expect(props.actions.completeAll).toHaveBeenCalled()
      })
    })
  })


  describe('props passed to components', () => {


    describe('toggle-all', () => {
      it('should pass actions.completeAll to onChange prop', () => {
        const actual = getComponent().find('.toggle-all').props().onChange
        const expected = props.actions.completeAll
        expect(actual).toBe(expected)
      })

      describe('when not all todos are complete', () => {
        beforeEach(() => {
          props.todos = [
            { id: 0, text: 'Use Redux', completed: false },
            { id: 1, text: 'Run the tests', completed: true }
          ]
        })

        it('should pass false to checked prop', () => {
          const actual = getComponent().find('.toggle-all').props().checked
          const expected = false
          expect(actual).toBe(expected)
        })
      })

      describe('when all todos are complete', () => {
        beforeEach(() => {
          props.todos = [
            { id: 0, text: 'Use Redux', completed: true },
            { id: 1, text: 'Run the tests', completed: true }
          ]
        })

        it('should pass true to checked prop', () => {
          const actual = getComponent().find('.toggle-all').props().checked
          const expected = true
          expect(actual).toBe(expected)
        })
      })
    })

    describe('todo-list-item', () => {
      it('should pass a todo as a prop', () => {
        const todoItem = getComponent().find('.todo-list').find(TodoItem).at(0)
        const actual = todoItem.props().todo
        const expected = props.todos[0]
        expect(actual).toBe(expected)
      })

      it('should pass actions individually as props', () => {
        const todoItem = getComponent().find('.todo-list').find(TodoItem).at(0)
        for (let action in props.actions) {
          const actual = todoItem.props()[action]
          const expected = props.actions[action]
          expect(actual).toBe(expected)
        }
      })
    })

    describe('footer', () => {
      it('should pass calculated completedCount as a prop', () => {
        const actual = getComponent().find(Footer).props().completedCount
        const expected = 1
        expect(actual).toBe(expected)
      })

      it('should pass calculated activeCount as a prop', () => {
        const actual = getComponent().find(Footer).props().activeCount
        const expected = 1
        expect(actual).toBe(expected)
      })

      it('should pass state.filter to filter prop', () => {
        const actual = getComponent().instance().state.filter
        const expected = SHOW_ALL
        expect(actual).toBe(expected)
      })

      it('should pass handleSetFilter method to handleSetFilter prop', () => {
        const actual = getComponent().find(Footer).props().handleSetFilter
        const expected = getComponent().instance().handleSetFilter
        expect(actual).toBe(expected)
      })

      it('should pass actions.clearCompleted to clearCompleted prop', () => {
        const actual = getComponent().find(Footer).props().clearCompleted
        const expected = props.actions.clearCompleted
        expect(actual).toBe(expected)
      })
    })
  })
})
