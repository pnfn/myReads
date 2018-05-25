import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import './App.css'

class ErrorBoundary extends React.Component {

  static propTypes = {
    hasError: PropTypes.bool.isRequired,
    error: PropTypes.object.isRequired
  }

  render() {
    var hasError = this.props
    var error = this.props

/* ERROR MESSAGE AND BUTTON */
    if (hasError) {
      console.log(error.error)
      return (
        <div className="error">
          <h1>Something went wrong.</h1>
          <h1>{error.error.message}.</h1>
          <Link
            to="/"
            className="close-search"
            onClick={event => this.super.render()}
          />
        </div>
      )
    }
    return this.props.children;
  }
}

export default ErrorBoundary
