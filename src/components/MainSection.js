import React, { Component, PropTypes} from 'react'
import Footer from './Footer'
import TodoItem from './TodoItem'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: (todo) => !todo.completed,
  [SHOW_COMPLETED]: (todo) => todo.completed
}

export default class MainSection extends Component {
  static propTypes = {
    todos: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  }

  state = {
    filter: SHOW_ALL
  }

  handleSetFilter = (filter) => {
    this.setState({filter})
  }

  renderCompleteAll (completedCount) {
    const { todos, actions } = this.props
    return (
      <input
        type='checkbox'
        className='toggle-all'
        checked={completedCount === todos.length}
        onChange={actions.completeAll} />
    )
  }

  renderFooter (completedCount) {
    const { todos, actions } = this.props
    return (
      <Footer
        completedCount={completedCount}
        activeCount={todos.length - completedCount}
        filter={this.state.filter}
        handleSetFilter={this.handleSetFilter}
        clearCompleted={actions.clearCompleted}
      />
    )
  }

  render () {
    const { todos, actions } = this.props
    const { filter } = this.state
    const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0)
    const filteredTodos = todos.filter(TODO_FILTERS[filter])

    return (
      <section className='main'>
        {todos.length ? this.renderCompleteAll(completedCount) : null}
        <ul className='todo-list'>
          {filteredTodos.map(todo =>
            <TodoItem key={todo.id} todo={todo} {...actions}/>
          )}
        </ul>
        {todos.length ? this.renderFooter(completedCount) : null}
      </section>
    )
  }
}
