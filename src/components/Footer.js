import React, { Component, PropTypes} from 'react'
import classnames from 'classnames'
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../constants/TodoFilters'

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
}

export default class Footer extends Component {
  static propTypes = {
    completedCount: PropTypes.number.isRequired,
    activeCount: PropTypes.number.isRequired,
    handleSetFilter: PropTypes.func.isRequired,
    filter: PropTypes.string.isRequired,
    clearCompleted: PropTypes.func.isRequired,
  }

  renderTodoCount () {
    const { activeCount } = this.props
    const itemWord = activeCount === 1 ? 'item' : 'items'
    return (
      <span className='todo-count'>
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    )
  }

  renderFilterButtons (filter) {
    const title = FILTER_TITLES[filter]
    const { filter: selectedFilter, handleSetFilter } = this.props
    return (
      <a
        className={classnames({selected: filter === selectedFilter})}
        style={{cursor: 'pointer'}}
        onClick={() => handleSetFilter(filter)} >
        {title}
      </a>
    )
  }

  renderClearButton () {
    const { completedCount, clearCompleted } = this.props
    if (completedCount) {
      return (
        <button className='clear-completed'
          onClick={clearCompleted} >
          Clear completed
        </button>
      )
    }
  }

  render () {
    return (
      <footer className='footer'>
        {this.renderTodoCount()}
        <ul className='filters'>
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterButtons(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    )
  }
}
