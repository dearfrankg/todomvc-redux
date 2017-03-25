import React from 'react'
import { mount } from 'enzyme'
import TextInput from '../TextInput'

describe('TextInput Component', (Component = TextInput) => {
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
      handleSave: jest.fn()
    }
    mountedComponent = undefined
  })


  describe('rendering', () => {
    it('should render correctly', () => {
      const actual = getComponent().find('input').type()
      const expected = 'input'
      expect(actual).toBe(expected)
    })

    describe('when newTodo prop is true', () => {
      beforeEach(() => {
        props.newTodo = true
      })

      it('should render with class new-todo', () => {
        const actual = getComponent().find('input').hasClass('new-todo')
        const expected = true
        expect(actual).toBe(expected)
      })
    })

    describe('when editing prop is true', () => {
      beforeEach(() => {
        props.editing = true
      })

      it('should render with class edit', () => {
        const actual = getComponent().find('input').hasClass('edit')
        const expected = true
        expect(actual).toBe(expected)
      })
    })

    describe('when text prop is defined', () => {
      beforeEach(() => {
        props.text = 'what is up'
      })

      it('should render with value matching', () => {
        const actual = getComponent().find('input').props().value
        const expected = 'what is up'
        expect(actual).toBe(expected)
      })
    })

    describe('when text prop is undefined', () => {
      beforeEach(() => {
        props.text = undefined
      })

      it('should render with value as an empty string', () => {
        const actual = getComponent().find('input').props().value
        const expected = ''
        expect(actual).toBe(expected)
      })
    })

    describe('when placeholder prop is defined', () => {
      beforeEach(() => {
        props.placeholder = 'what is up'
      })

      it('should render with placeholder matching', () => {
        const actual = getComponent().find('input').props().placeholder
        const expected = 'what is up'
        expect(actual).toBe(expected)
      })
    })

    describe('when placeholder prop is undefined', () => {
      beforeEach(() => {
        props.placeholder = undefined
      })

      it('should render with placeholder matching', () => {
        const actual = getComponent().find('input').props().placeholder
        const expected = undefined
        expect(actual).toBe(expected)
      })
    })

  })


  describe('callbacks', () => {
    describe('input', () => {
      describe('when change event', () => {
        it('should set input value', () => {
          const eventData = {target: {value: 'hello'}}
          const input = getComponent().find('input')
          input.simulate('change', eventData)
          const actual = input.props().value
          const expected = 'hello'
          expect(actual).toBe(expected)
        })
      })

      describe('when blur event', () => {
        describe('when newTodo is false', () => {
          beforeEach(() => {
            props.newTodo = false
          })

          it('should call handleSave', () => {
            const eventData = {target: {value: 'hello'}}
            const input = getComponent().find('input')
            input.simulate('blur', eventData)
            expect(props.handleSave).toHaveBeenCalledWith('hello')
          })
        })

        describe('when newTodo is true', () => {
          beforeEach(() => {
            props.newTodo = true
          })

          it('should not call handleSave', () => {
            const eventData = {target: {value: 'hello'}}
            const input = getComponent().find('input')
            input.simulate('blur', eventData)
            expect(props.handleSave).not.toHaveBeenCalledWith('hello')
          })
        })


      })

      describe('when keydown event without ENTER key', () => {
        it('should not call handleSave', () => {
          const eventData = {which: 27, target: {value: 'hello'}}
          const input = getComponent().find('input')
          input.simulate('keydown', eventData)
          expect(props.handleSave).not.toHaveBeenCalledWith('hello')
        })
      })

      describe('when keydown event with ENTER key', () => {
        it('should call handleSave', () => {
          const eventData = {which: 13, target: {value: 'hello'}}
          const input = getComponent().find('input')
          input.simulate('keydown', eventData)
          expect(props.handleSave).toHaveBeenCalledWith('hello')
        })

        describe('when newTodo is true', () => {
          beforeEach(() => {
            props.newTodo = true
          })

          it('should clear input field', () => {
            const eventData = {which: 13, target: {value: 'hello'}}
            const input = getComponent().find('input')
            input.simulate('keydown', eventData)
            const actual = input.props().value
            const expected = ''
            expect(actual).toBe(expected)
          })
        })
      })
    })
  })


  describe('props passed to components', () => {
    describe('input', () => {
      it('should set type prop to `text`', () => {
        const actual = getComponent().find('input').props().type
        const expected = 'text'
        expect(actual).toBe(expected)
      })

      it('should set placeholder prop to `placeholder`', () => {
        const actual = getComponent().find('input').props().placeholder
        const expected = props.placeholder
        expect(actual).toBe(expected)
      })

      it('should set onChange prop to `handleChange method`', () => {
        const actual = getComponent().find('input').props().onChange
        const expected = getComponent().instance().handleChange
        expect(actual).toBe(expected)
      })

      it('should set onBlur prop to `handleBlur method`', () => {
        const actual = getComponent().find('input').props().onBlur
        const expected = getComponent().instance().handleBlur
        expect(actual).toBe(expected)
      })

      it('should set onKeyDown prop to `handleSubmit method`', () => {
        const actual = getComponent().find('input').props().onKeyDown
        const expected = getComponent().instance().handleSubmit
        expect(actual).toBe(expected)
      })

      describe('when text prop is defined', () => {
        beforeEach(() => {
          props.text = 'hello'
        })

        it('should set value prop to `text`', () => {
          const actual = getComponent().find('input').props().value
          const expected = props.text
          expect(actual).toBe(expected)
        })
      })

      describe('when text prop is undefined', () => {
        beforeEach(() => {
          props.text = undefined
        })

        it('should set value prop to empty string', () => {
          const actual = getComponent().find('input').props().value
          const expected = ''
          expect(actual).toBe(expected)
        })
      })

      describe('when editing prop is true', () => {
        beforeEach(() => {
          props.editing = true
        })

        it('should set class prop to include `edit`', () => {
          const actual = getComponent().find('input').hasClass('edit')
          const expected = true
          expect(actual).toBe(expected)
        })
      })

      describe('when newTodo prop is true', () => {
        beforeEach(() => {
          props.newTodo = true
        })

        it('should set class prop to include `new-todo`', () => {
          const actual = getComponent().find('input').hasClass('new-todo')
          const expected = true
          expect(actual).toBe(expected)
        })
      })
    })
  })
})
