import React, { Component, PropTypes} from 'react'
import TextInput from './TextInput'

export default class Header extends Component {
  static propTypes = {
    addTodo: PropTypes.func.isRequired
  }

  handleSave = (text) => {
    if (text.length > 0) {
      this.props.addTodo(text)
    }
  }

  render () {
    return (
      <header className='header'>
        <h1>todos</h1>
        <TextInput
          newTodo
          handleSave={this.handleSave}
          placeholder='What needs to be done?' />
      </header>
    )
  }
}
