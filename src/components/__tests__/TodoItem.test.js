import React from 'react'
import { mount } from 'enzyme'
import TodoItem from '../TodoItem'
import TextInput from '../TextInput'

describe('TodoItem Component', (Component = TodoItem) => {
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
      todo: {
        id: 0,
        text: 'use redux',
        completed: false
      },
      completeTodo: jest.fn(),
      editTodo: jest.fn(),
      deleteTodo: jest.fn()
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      let todoItem = getComponent()
      let actual = todoItem.type()
      let expected = TodoItem
      expect(actual).toBe(TodoItem)

      actual = todoItem.find('li').length
      expected = 1
      expect(actual).toBe(expected)

      actual = todoItem.find('.view').length
      expected = 1
      expect(actual).toBe(expected)

      actual = todoItem.find('.toggle').length
      expected = 1
      expect(actual).toBe(expected)

      actual = todoItem.find('label').length
      expected = 1
      expect(actual).toBe(expected)

      actual = todoItem.find('button').length
      expected = 1
      expect(actual).toBe(expected)
    })

    describe('when in edit-mode', () => {
      beforeEach(() => {
        props.todo = {id: 0, text: 'fun', completed: true}
      })

      it('should render todo in edit mode', () => {
        getComponent().instance().handleDoubleClick()
        const actual = getComponent().find(TextInput).length
        const expected = 1
        expect(actual).toBe(expected)
      })

      it('should render li with class "editing"', () => {
        getComponent().instance().handleDoubleClick()
        const actual = getComponent().find('li').hasClass('editing')
        const expected = true
        expect(actual).toBe(expected)
      })
    })

    describe('when in view mode', () => {
      beforeEach(() => {
        props.todo = {id: 0, text: 'fun', completed: true}
      })

      it('should render todo in view mode', () => {
        const view = getComponent().find('.view')
        let actual = view.type()
        let expected = 'div'
        expect(actual).toBe(expected)

        actual = view.children().at(0).type()
        expected = 'input'
        expect(actual).toBe(expected)

        actual = view.children().at(1).type()
        expected = 'label'
        expect(actual).toBe(expected)

        actual = view.children().at(2).type()
        expected = 'button'
        expect(actual).toBe(expected)
      })
    })

    describe('when the todo is complete', () => {
      beforeEach(() => {
        props.todo = {id: 0, text: 'fun', completed: true}
      })

      it('should render li with class "completed"', () => {
        const actual = getComponent().find('li').hasClass('completed')
        const expected = true
        expect(actual).toBe(expected)
      })
    })
  })


  describe('callbacks', () => {
    describe('when in edit mode', () => {
      describe('when saving with text.length > 0', () => {
        it('should call editTodo and exit edit mode', () => {
          getComponent().instance().handleDoubleClick()
          const eventData = {which: 13, target: {value: 'hello'}}
          getComponent().find('input').simulate('keydown', eventData)
          expect(props.editTodo).toHaveBeenCalled()
          const actual = getComponent().find('.view').length
          const expected = 1
          expect(actual).toBe(expected)
        })
      })

      describe('when saving with text.length = 0', () => {
        it('should call deleteTodo and exit edit mode', () => {
          getComponent().instance().handleDoubleClick()
          const eventData = {which: 13, target: {value: ''}}
          getComponent().find('input').simulate('keydown', eventData)
          expect(props.deleteTodo).toHaveBeenCalled()
          const actual = getComponent().find('.view').length
          const expected = 1
          expect(actual).toBe(expected)
        })
      })
    })

    describe('when in view mode', () => {
      describe('when toggle is clicked', () => {
        it('should call completeTodo', () => {
          getComponent().find('.toggle').simulate('change')
          expect(props.completeTodo).toHaveBeenCalled()
        })
      })

      describe('when label is doubleclicked', () => {
        it('should enter edit mode', () => {
          getComponent().find('label').simulate('doubleclick')
          const actual = getComponent().find(TextInput).length
          const expected = 1
          expect(actual).toBe(expected)
        })
      })

      describe('when delete button is clicked', () => {
        it('should call deleteTodo', () => {
          getComponent().find('.destroy').simulate('click')
          expect(props.deleteTodo).toHaveBeenCalled()
        })
      })
    })
  })


  describe('props passed to components', () => {
    describe('when in edit mode', () => {
      describe('TextInput', () => {
        it('should set text prop to `todo.text`', () => {
          getComponent().instance().handleDoubleClick()
          const actual = getComponent().find(TextInput).props().text
          const expected = props.todo.text
          expect(actual).toBe(expected)
        })

        it('should set editing prop to `state.editing`', () => {
          getComponent().instance().handleDoubleClick()
          const actual = getComponent().find(TextInput).props().editing
          const expected = true
          expect(actual).toBe(expected)
        })

        it('should set handleSave prop to an anonymous function', () => {
          getComponent().instance().handleDoubleClick()
          const actual = typeof getComponent().find(TextInput).props().handleSave
          const expected = 'function'
          expect(actual).toBe(expected)
        })
      })
    })

    describe('when in view mode', () => {
      describe('todo complete toggle', () => {
        it('should set type prop to `checkbox`', () => {
          const actual = getComponent().find('input').props().type
          const expected = 'checkbox'
          expect(actual).toBe(expected)
        })

        it('should set checked prop to `todo.completed`', () => {
          const actual = getComponent().find('input').props().checked
          const expected = props.todo.completed
          expect(actual).toBe(expected)
        })

        it('should set onChange prop to an anonymous function', () => {
          const actual = typeof getComponent().find('input').props().onChange
          const expected = 'function'
          expect(actual).toBe(expected)
        })
      })

      describe('todo label', () => {
        it('should set onDoubleClick prop to `handleDoubleClick method`', () => {
          const actual = getComponent().find('label').props().onDoubleClick
          const expected = getComponent().instance().handleDoubleClick
          expect(actual).toBe(expected)
        })
      })

      describe('todo destroy button', () => {
        it('should set onClick prop to an anonymous function', () => {
          const actual = typeof getComponent().find('button').props().onClick
          const expected = 'function'
          expect(actual).toBe(expected)
        })
      })
    })
  })
})
