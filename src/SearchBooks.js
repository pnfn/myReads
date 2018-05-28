import React from 'react'
import PropTypes from 'prop-types'
import BookItem from './BookItem'
import * as BooksAPI from './BooksAPI'
import { Link } from 'react-router-dom'
import sortBy from 'sort-by'
import debounce from 'lodash.debounce'

class SearchBooks extends React.Component {

  constructor(props) {
    super(props);
    this.updateQuery = debounce(this.updateQuery,2000);
  }
/* Ading one more Book List array to work with Search */
  state = {
    query: '',
    searchedBooks: []
  }

  static propTypes = {
    state: PropTypes.object.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
  }

/* Catching eventual errors and providing a <BUTTON> (inside render()) to restar App */
  componentDidCatch(error) {
    this.setState({ error })
  }

/* Main Change Bookshelf Function */
    onChangeBookShelf = (book, shelf) => {
      this.props.onChangeBookShelf(book, shelf, true)
    }

/* Clear Query for browser Path changing */
    clearQuery = () => {
      this.setState({ query: '' })
    }

/* Main Search Function */
  updateQuery = (query) => {
    if (query !== '') {
      this.setState({ query: query.trim() })
      BooksAPI.search(query).then((searchedBooks) => {

/* Filtering Searched Books already in Shelf */
        function resolveShelf(sBook, book) {
/* If the searched book is alredy in local Book List, then change options are locked with <sBook.shelf = ''> */
            if (sBook.id === book.id) {
              sBook.shelf = ''
              sBook.shelfState = book.shelf
           }
        }

        searchedBooks.map((sBook) =>
          this.props.state.books.map((book) => {
            return resolveShelf(sBook, book)
          })
        )

        this.clearQuery()
/* Order Books Alphabetcally by Title */
        searchedBooks.sort(sortBy('title'))
        this.setState({ searchedBooks: searchedBooks })
      }).catch((error) => this.componentDidCatch(error))
    }
  }

  render () {

    return (
      <div className="search-books">
        <div className="search-books-bar">
            <Link
              to="/"
              className="close-search"
              onClick={event => this.clearQuery()}
            />
          <div className="search-books-input-wrapper">
            <input
              className='search-books'
              type='text'
              value={this.query}
              onChange={event => this.updateQuery(event.target.value)}
              placeholder="Search by title or author"/>

          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">

{/* If something has been searchm then display it on Books Grid */}
            {this.state.searchedBooks.length > 0 && (
              this.state.searchedBooks.sort(sortBy('title')).map((bookItem) => (
                <li key={bookItem.id} className='book-item'>
{/* Every Book on list is created by BookItem component */}
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

    )
  }
}

export default SearchBooks
