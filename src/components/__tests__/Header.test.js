import React from 'react'
import { mount } from 'enzyme'
import Header from '../Header'
import TextInput from '../TextInput'

describe('Header Component', (Component = Header) => {
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
      addTodo: jest.fn()
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      let actual = getComponent().find('header').type()
      let expected = 'header'
      expect(actual).toBe(expected)

      actual = getComponent().find('h1').type()
      expected = 'h1'
      expect(actual).toBe(expected)

      actual = getComponent().find(TextInput).type()
      expected = TextInput
      expect(actual).toBe(expected)
    })
  })


  describe('callbacks', () => {
    describe('when saving with text.length > 0', () => {
      it('should call addTodo', () => {
        const eventData = {which: 13, target:{value: 'x'}}
        getComponent().find('input').simulate('keydown', eventData)
        const addTodo = getComponent().props().addTodo
        expect(addTodo).toHaveBeenCalledWith('x')
      })
    })

    describe('when saving with text.length = 0', () => {
      it('should not call addTodo', () => {
        const eventData = {which: 13, target:{value: ''}}
        getComponent().find('input').simulate('keydown', eventData)
        const addTodo = getComponent().props().addTodo
        expect(addTodo).not.toHaveBeenCalled()
      })
    })
  })


  describe('props passed to components', () => {
    describe('TextInput', () => {
      it('should set newTodo prop to `true`', () => {
        const actual = getComponent().find(TextInput).props().newTodo
        const expected = true
        expect(actual).toBe(expected)
      })

      it('should set handleSave prop to `handleSave method`', () => {
        const actual = getComponent().find(TextInput).props().handleSave
        const expected = getComponent().instance().handleSave
        expect(actual).toBe(expected)
      })

      it('should set placeholder prop to `What needs to be done?`', () => {
        const actual = getComponent().find(TextInput).props().placeholder
        const expected = 'What needs to be done?'
        expect(actual).toBe(expected)
      })
    })
  })
})
