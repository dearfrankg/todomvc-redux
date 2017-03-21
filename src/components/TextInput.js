import React, { Component, PropTypes} from 'react'
import classnames from 'classnames'

export default class TextInput extends Component {
  static propTypes = {
    handleSave: PropTypes.func.isRequired,
    newTodo: PropTypes.bool,
    editing: PropTypes.bool,
    text: PropTypes.string,
    placeholder: PropTypes.string
  }

  state = {
    text: this.props.text || ''
  }

  handleChange = (e) => {
    this.setState({text: e.target.value})
  }

  handleBlur = (e) => {
    if (!this.props.newTodo) {
      this.props.handleSave(e.target.value.trim())
    }
  }

  handleSubmit = (e) => {
    const ENTER_KEY = 13
    if (e.which === ENTER_KEY) {
      this.props.handleSave(e.target.value.trim())
      if (this.props.newTodo) {
        this.setState({text: ''})
      }
    }
  }

  render () {
    return (
      <input
        type='text'
        className={classnames({
          edit: this.props.editing,
          'new-todo': this.props.newTodo
        })}
        placeholder={this.props.placeholder}
        value={this.state.text}
        onChange={this.handleChange}
        onBlur={this.handleBlur}
        onKeyDown={this.handleSubmit}
      />
    )
  }
}
