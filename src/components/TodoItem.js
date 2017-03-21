import React, { Component, PropTypes} from 'react'
import TextInput from './TextInput'
import classnames from 'classnames'

export default class TodoItem extends Component {
  static propTypes = {
    todo: PropTypes.object.isRequired,
    completeTodo: PropTypes.func.isRequired,
    editTodo: PropTypes.func.isRequired,
    deleteTodo: PropTypes.func.isRequired
  }

  state = {
    editing: false
  }

  handleDoubleClick = () => {
    this.setState({editing: true})
  }

  handleSave = (id, text) => {
    (text.length)
      ? this.props.editTodo({id, text})
      : this.props.deleteTodo(id)
    this.setState({editing: false})
  }

  getTodoElement () {
    const { todo, completeTodo, deleteTodo } = this.props

    if (this.state.editing) {
      return (
        <TextInput
          text={todo.text}
          editing={this.state.editing}
          handleSave={(text) => this.handleSave(todo.id, text)}
        />
      )
    } else {
      return (
        <div className='view'>
          <input
            type='checkbox'
            className='toggle'
            checked={todo.completed}
            onChange={() => completeTodo(todo.id)}
          />
          <label onDoubleClick={this.handleDoubleClick}>
            {todo.text}
          </label>
          <button className='destroy'
            onClick={() => deleteTodo(todo.id)} />
        </div>
      )
    }
  }

  render () {
    return (
      <li className={classnames({
        editing: this.state.editing,
        completed: this.props.todo.completed
      })}>
        {this.getTodoElement()}
      </li>
    )
  }
}
