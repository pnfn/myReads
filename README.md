# MyReads Project

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`


## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now. Instructions for the methods are below.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── BookItem.js # Used in both listing and search features for mouting books list. Instructions for the methods are below.
    ├── ErrorBoundary.js # Implements React ErrorBoundary pattern Class.
    ├── ListBooks.js # Used for mouting books list in main page. Instructions for the methods are below.
    ├── SearchBooks.js # Used for searching in API then returning searched books list. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   ├── arrow-drop-down.svg
    │   ├── no-book-cover.png
    │   ├── shelf.png
    │   └── star.png
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query)
```

* query: `<String>`
* Returns a Promise which resolves to a JSON object containing a collection of a maximum of 20 book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## App

Mounts the entire application based on Routing. There are two separate paths [/] and [/search]. App starts with [/] and uses ListBooks.js to mount the book list that is already in use (already have a shelf). If user clicks the Add/Search button, then Router sets path to [/search] and invokes SearchBooks.js.
Also, the change process in books shelf is made here as well, through the method onChangeBookShelf which is callled somewere in the child structure and resolved in App.js (parent).

* [`onChangeBookShelf`](#onchangebookshelf)

### `onChangeBookShelf`

Method Signature:

```js
onChangeBookShelf(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read", "none"]  
* Changes the book shelf property based on requested shelf. Changes it both locally (updateing local list) and remotelly (through BooksAPI update method)


## BookItem Class

* [`onChangeBookShelf`](#onchangebookshelf)
* [`averageRating`](#averagerating)

### `onChangeBookShelf`

Method Signature:

```js
onChangeBookShelf(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read", "none"]  
* Calls the upper onChangeBookShelf method

### `averageRating`

Method Signature:

```js
averageRating(bookItem)
```

* Returns the block HTML structure for the book's average star rating.
* If the book has no rating in server, then the HTML block is not returned.


## ListBooks Class

* [`onChangeBookShelf`](#onchangebookshelf)
* [`booksFilter`](#booksfilter)

### `onChangeBookShelf`

Method Signature:

```js
onChangeBookShelf(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read", "none"]  
* Calls the upper onChangeBookShelf method

### `booksFilter`

Method Signature:

```js
booksFilter(books, shelf)
```

* books: `<Array>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read", "none"]  
* Filters books list based on shelf condition


## SearchBooks Class

* [`onChangeBookShelf`](#onchangebookshelf)
* [`updateQuery`](#updatequery)

### `onChangeBookShelf`

Method Signature:

```js
onChangeBookShelf(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read", "none"]  
* Calls the upper onChangeBookShelf method

### `updateQuery`

Method Signature:

```js
updateQuery(query)
```

* query: `<String>` containing the text typed by user for search purposes
* Calls and Returns search(query) method on BooksAPI.js through Backend Server
