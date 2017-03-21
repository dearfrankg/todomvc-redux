import React from 'react'
import { mount } from 'enzyme'
import App from '../App'
import Header from '../../components/Header'
import MainSection from '../../components/MainSection'
import store from '../../store'

describe('App Container', (Component = App) => {
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
      store: store,
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      let actual = getComponent().find('div').at(0).type()
      let expected = 'div'
      expect(actual).toBe(expected)

      actual = getComponent().find(Header).type()
      expected = Header
      expect(actual).toBe(expected)

      actual = getComponent().find(MainSection).type()
      expected = MainSection
      expect(actual).toBe(expected)
    })
  })

  describe('props passed to components', () => {
    describe('Header', () => {
      it('should pass actions.addTodo to addTodo prop', () => {
        const actual = typeof getComponent().find(Header).props().addTodo
        const expected = 'function'
        expect(actual).toBe(expected)
      })
    })

    describe('MainSection', () => {
      it('should pass todos to todos prop', () => {
        const actual = getComponent().find(MainSection).props().todos
        const expected = [ { id: 0, text: 'use redux', completed: false } ]
        expect(actual).toEqual(expected)
      })

      it('should pass actions to actions prop', () => {
        const actions = getComponent().find(MainSection).props().actions
        const numberOfActions = Object.keys(actions).length
        expect(numberOfActions).toBe(6)
        for (let action in actions) {
          expect(typeof actions[action]).toBe('function')
        }
      })
    })
  })
})
