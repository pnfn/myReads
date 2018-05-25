import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'

class ListBooks extends React.Component {

  static propTypes = {
    state: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

/* Catching eventual errors and providing a <BUTTON> (inside render()) to restar App */
  componentDidCatch(error) {
    this.setState({
      hasError: true,
      error: error
    })
  }

/* Main Change Bookshelf Function */
  onChangeBookShelf = (book, shelf) => {
    this.props.onChangeBookShelf(book, shelf, false)
  }

  render () {

/* Order Books Alphabetcally by Title */
    this.props.state.books.sort(sortBy('title'))

/* DIFFERENT SHELF LOGIC  - Separates Books on diff lists based on SHELF */
    let shelfCurrentlyReading = this.props.state.books.filter( (bookItem) => bookItem.shelf === 'currentlyReading')
    let shelfWantToRead = this.props.state.books.filter( (bookItem) => bookItem.shelf === 'wantToRead')
    let shelfRead = this.props.state.books.filter( (bookItem) => bookItem.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>

{/* CURRENTLY READING SHELF */}

            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {shelfCurrentlyReading.length > 0 && (
                  shelfCurrentlyReading.map((bookItem) => (
                    <li key={bookItem.id} className='book-item'>
                      <BookItem
                      bookItem = {bookItem}
                      onChangeBookShelf = {this.onChangeBookShelf}
                      />
                    </li>
                  ))
                )}
                </ol>
              </div>
            </div>

{/* WANT TO READ SHELF */}

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {shelfWantToRead.length > 0 && (
                  shelfWantToRead.map((bookItem) => (
                    <li key={bookItem.id} className='book-item'>
                      <BookItem
                      bookItem = {bookItem}
                      onChangeBookShelf = {this.onChangeBookShelf}
                      />
                    </li>
                  ))
                )}
                </ol>
              </div>
            </div>

{/* READ SHELF */}

            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                {shelfRead.length > 0 && (
                  shelfRead.map((bookItem) => (
                    <li key={bookItem.id} className='book-item'>
                      <BookItem
                      bookItem = {bookItem}
                      onChangeBookShelf = {this.onChangeBookShelf}
                      />
                    </li>
                  ))
                )}
                </ol>
              </div>
            </div>
          </div>
        </div>

{/* ADD/SEARCH BUTTON */}

          <div className="open-search">
            <a>Add a book</a>
              <Link
                to="/search"
                className="open-search"
              />
          </div>

      </div>
    )
  }
}

export default ListBooks
