import React from 'react'
import PropTypes from 'prop-types'

class BookItem extends React.PureComponent {

  static propTypes = {
    bookItem: PropTypes.object.isRequired,
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
    this.props.onChangeBookShelf(book, shelf)
  }

  render () {

/* Current Book on iteration */
    let { bookItem } = this.props

/* <SELECT> and <OPTION> control variables */
    let defaultValue
    let shelfState

/* SELECTED <OPTION> LOGIC  - PLUS CODE!!! */
/* Pre-selects the <OPTION> based on shelf status */
    switch (this.props.bookItem.shelf) {
      case 'currentlyReading':
          this.currentlyReadingSelect = true
          defaultValue = 'currentlyReading'
          shelfState = 'Currently Reading'
          break;
      case 'wantToRead':
          this.wantToReadSelect = true
          defaultValue = 'wantToRead'
          shelfState = 'Want To Read'
          break;
      case 'read':
          this.readSelect = true
          defaultValue = 'read'
          shelfState = 'Read'
          break;
      default:
          this.noneSelect = true
          defaultValue = 'none'
    }

    switch (this.props.bookItem.shelfState) {
      case 'currentlyReading':
          shelfState = 'Currently Reading'
          break;
      case 'wantToRead':
          shelfState = 'Want To Read'
          break;
      case 'read':
          shelfState = 'Read'
          break;
      default:
          shelfState = ''
    }

/* AVERAGE RATING LOGIC - PLUS CODE!!! */
  function averageRating(bookItem) {
    return (
      <table>
        <tbody>
          <tr>
            <td className="average-rating"></td>
            <td className="book-title">{bookItem.averageRating}</td>
          </tr>
        </tbody>
      </table>
    )
  }

    function getBookCover(bookItem) {
      if (bookItem.imageLinks) {
        return <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookItem.imageLinks.smallThumbnail})` }}></div>
      }
      return <div className="book-no-cover"></div>
    }

/* SELECTABLE BOOKS */
    if (bookItem.shelf !== '') {



      return (
        <div className="book">
          <div className="book-top">
          {getBookCover(bookItem)}
          <div className="book-shelf-changer">
              <select defaultValue={defaultValue} onChange={event => this.onChangeBookShelf(bookItem, event.target.value)}>
                <option value="moveTo" disabled>Move to...</option>
                  <option value="currentlyReading" disabled={this.currentlyReadingSelect}>Currently Reading</option>
                  <option value="wantToRead" disabled={this.wantToReadSelect}>Want to Read</option>
                  <option value="read" disabled={this.readSelect}>Read</option>
                  <option value="none" disabled={this.noneSelect}>None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{bookItem.title}</div>
          <div className="book-authors">{bookItem.authors}</div>

          {bookItem.averageRating > 0 &&
              averageRating(bookItem)
          }
        </div>
      )

/* BOOKS ON SEARCH LIST BUT ALREADY IN USER'S SHELF  - SELECTION LOCKED*/
    } else {

      return (
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${bookItem.imageLinks.smallThumbnail})` }}></div>
              <div className="tooltip"><span className="tooltiptext">Already in ''{shelfState}''</span></div>
          </div>
          <div className="book-title">{bookItem.title}</div>
          <div className="book-authors">{bookItem.authors}</div>

          {bookItem.averageRating > 0 &&
            averageRating(bookItem)
          }
        </div>
      )
    }
  }
}

export default BookItem
