/* MyReadings Project p1-my-reads */
import React from 'react'
import * as BooksAPI from './BooksAPI'
import ListBooks from './ListBooks'
import SearchBooks from './SearchBooks'
import { withRouter, Route } from 'react-router-dom'
import ErrorBoundary from './ErrorBoundary.js'
import './App.css'

class BooksApp extends React.Component {

  state = {
    query: '',
    /* Main Books array */
    books: [],
    hasError: false,
    error: null
  }

/* Catching eventual errors and providing a <BUTTON> (inside render()) to restar App */
  componentDidCatch(error) {
      this.setState({
        hasError: true,
        error: error
      })
    }

/* FECTH ALL BOOKS IN USE PRIOR TO BEGIN THE APP <getAll()> from API */
  componentWillMount() {
    BooksAPI.getAll()
    .then((booksList) => {
      this.setState({ books: booksList })
    }).catch((error) => this.componentDidCatch(error))
  }

/* Main Change Bookshelf Function */
  onChangeBookShelf = (book, shelf, isNew) => {

    var newBooks = this.state.books.slice()

/* If Book is comming from Search page <isNew>, add to local Book List */
    if (isNew) {
      BooksAPI.update(book, shelf)
      .then(
        book.shelf = shelf
      ).then(
        newBooks.push(book)
      ).then(
        this.props.history.push('/')
      )

/* If Book is already in local Book List <isNew = false> */
    } else {

      function resolveShelf(sBook, book) {
        if (sBook.id === book.id) {

/* If Book stays in local Book List <isNew = false> */
          if (shelf !== 'none') {
            book.shelf = shelf

/* If Book is set to None -> Remove from local Book List */
          } else {
/* Remove Books from local List */
            newBooks = newBooks.filter((b) => b !== book)
          }
        }
      }
      BooksAPI.update(book, shelf)
      .then(
        newBooks.map((sBook) => {
            return resolveShelf(sBook, book)
        })
      ).catch((error) => this.componentDidCatch(error))
    }
    this.setState({books: newBooks})
  }

  render() {

/* IF ERROR */
    if (this.state.hasError) {
      return (
        <ErrorBoundary
          hasError = {true}
          error = {this.state.error}
        />
      )
    }

    return (
      <div className="app">

{/* IF LIST BOOKS IN SHELF */}

      <Route exact path="/" render={() => (
        <ListBooks
        state = {this.state}
        onChangeBookShelf = {this.onChangeBookShelf}
        />
      )}/>

{/* IF SEARCH BOOKS */}

      <Route exact path="/search" render={() => (
        <SearchBooks
        state = {this.state}
        onChangeBookShelf = {this.onChangeBookShelf}
        />
      )}/>

      </div>
    )
  }
}

export default withRouter (BooksApp)
