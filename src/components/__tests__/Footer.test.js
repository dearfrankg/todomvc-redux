import React from 'react'
import { mount } from 'enzyme'
import Footer from '../Footer'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../../constants/TodoFilters'

describe('Footer Component', (Component = Footer) => {
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
      completedCount: 5,
      activeCount: 3,
      clearCompleted: jest.fn(),
      handleSetFilter: jest.fn(),
      filter: SHOW_ALL
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      expect(getComponent().find('footer').type()).toBe('footer')
      expect(getComponent().find('.todo-count').type()).toBe('span')
      expect(getComponent().find('.filters').type()).toBe('ul')

      const filters = getComponent().find('.filters')
      const filtersArray = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
      filtersArray.forEach((filter, i) => {
        const li = filters.children().at(i)
        expect(li.type()).toBe('li')
        const a = li.children().at(0)
        expect(a.type()).toBe('a')
        expect(a.text()).toBe(['All', 'Active', 'Completed'][i])
        expect(a.hasClass('selected')).toBe(i == 0 ? true : false)
      })

      expect(getComponent().find('.clear-completed').type()).toBe('button')
      expect(getComponent().find('.clear-completed').text()).toBe('Clear completed')
    })

    describe('when activeCount is 0', () => {
      beforeEach(() => {
        props.activeCount = 0
      })

      it('should render todo count as "No items left"', () => {
        const actual = getComponent().find('.todo-count').text()
        const expected = 'No items left'
        expect(actual).toBe(expected)
      })
    })

    describe('when activeCount is 1', () => {
      beforeEach(() => {
        props.activeCount = 1
      })

      it('should render todo count as "1 item left"', () => {
        const actual = getComponent().find('.todo-count').text()
        const expected = '1 item left'
        expect(actual).toBe(expected)
      })
    })

    describe('when activeCount is 2', () => {
      beforeEach(() => {
        props.activeCount = 2
      })

      it('should render todo count as "2 items left"', () => {
        const actual = getComponent().find('.todo-count').text()
        const expected = '2 items left'
        expect(actual).toBe(expected)
      })
    })

    describe('when completedCount is 0', () => {
      beforeEach(() => {
        props.completedCount = 0
      })

      it('should not render clear-completed button', () => {
        const actual = getComponent().find('.clear-completed').length
        const expected = 0
        expect(actual).toBe(expected)
      })
    })

    describe('when completedCount is > 0', () => {
      beforeEach(() => {
        props.completedCount = 3
      })

      it('should render clear-completed button', () => {
        const actual = getComponent().find('.clear-completed').length
        const expected = 1
        expect(actual).toBe(expected)
      })
    })
  })


  describe('function prop calls', () => {
    describe('when filter link clicked', () => {
      it('should call handleSetFilter with the correct filter', () => {
        const handleSetFilter = getComponent().props().handleSetFilter
        const filters = getComponent().find('.filters')
        const filtersArray = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
        filtersArray.forEach((filter, i) => {
          const a = filters.children().at(i).children().at(0)
          a.simulate('click')
          expect(handleSetFilter).toHaveBeenCalledWith(filter)
        })
      })
    })

    describe('when clear-completed button clicked', () => {
      it('should call clearCompleted', () => {
        const clearCompleted = getComponent().props().clearCompleted
        const clearCompletedButton = getComponent().find('.clear-completed')
        clearCompletedButton.simulate('click')
        expect(clearCompleted).toHaveBeenCalled()
      })
    })
  })


  describe('props passed to components', () => {
    describe('filter links', () => {
      it('should pass handleSetFilter to onClick prop', () => {
        const handleSetFilter = getComponent().props().handleSetFilter
        const filters = getComponent().find('.filters')
        const filtersArray = [SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED]
        filtersArray.forEach((filter, i) => {
          const a = filters.children().at(i).children().at(0)
          a.simulate('click')
          expect(handleSetFilter).toHaveBeenCalled()
        })
      })

      describe('when filter prop matches filter link', () => {
        beforeEach(() => {
          props.filter = SHOW_ACTIVE
        })
        it('should pass "selected" to className prop', () => {
          const actual = getComponent().find('a').at(1).props().className
          const expected = 'selected'
          expect(actual).toBe(expected)
        })
      })
    })

    describe('clear-completed button', () => {
      it('should pass clearCompleted to onClick prop', () => {
        const actual = getComponent().find('.clear-completed').props().onClick
        const expected = getComponent().props().clearCompleted
        expect(actual).toBe(expected)
      })
    })
  })
})
