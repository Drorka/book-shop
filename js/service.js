'use strict'
const STORAGE_KEY = 'booksDB'
const PAGE_SIZE = 10

var gBooks
var gCurrBookId
var gFilterBy = { minRate: 0, maxPrice: 30, searchTxt: '' }
var gSortBy = ''
var gPageIdx = 0

_createBooks()

var gNextId = 101 + gBooks.length

function _createBooks() {
  var books = loadFromStorage(STORAGE_KEY)
  if (!books || !books.length) {
    books = [
      {
        id: '101',
        title: 'The Book of Charms & Spells',
        price: 10,
        rate: 0,
      },
      {
        id: '102',
        title: 'A History of Magic',
        price: 6,
        rate: 0,
      },
      {
        id: '103',
        title: 'The Monster Book of Monsters',
        price: 12,
        rate: 0,
      },
      {
        id: '104',
        title: 'The Dark Forces: A Guide to Self-Protection ',
        price: 22,
        rate: 0,
      },
      {
        id: '105',
        title: 'Magical Drafts and Potions',
        price: 8,
        rate: 0,
      },
      {
        id: '106',
        title: 'Unfogging the Future',
        price: 10,
        rate: 0,
      },
      {
        id: '107',
        title: "A Beginner's Guide to Transfiguration",
        price: 10,
        rate: 0,
      },
      {
        id: '108',
        title: 'Fantastic Beasts and Where to Find Them',
        price: 15,
        rate: 0,
      },
      {
        id: '109',
        title: 'Travels with Trolls',
        price: 18,
        rate: 0,
      },
      {
        id: '110',
        title: 'Easy Spells to Fool Muggles',
        price: 21,
        rate: 0,
      },
      {
        id: '111',
        title: 'Curses and Counter-Curses',
        price: 24,
        rate: 0,
      },
      {
        id: '112',
        title: 'Wanderings with Werewolves',
        price: 17,
        rate: 0,
      },
      {
        id: '113',
        title: 'Break with a Banshee',
        price: 8,
        rate: 0,
      },
      {
        id: '114',
        title: 'Magical Theory',
        price: 12,
        rate: 0,
      },
    ]
  }
  gBooks = books
  _saveBooksToStorage()
}

function getBooks() {
  var books = gBooks.filter(
    (book) =>
      book.rate >= gFilterBy.minRate &&
      book.price < gFilterBy.maxPrice &&
      book.title.toLowerCase().includes(gFilterBy.searchTxt)
  )

  switch (gSortBy) {
    case 'Title':
      books.sort((book1, book2) => (book1.title > book2.title ? 1 : -1))
      break
    case 'Price':
      books.sort((book1, book2) => book1.price - book2.price)
      break
    case 'ID':
      books.sort((book1, book2) => book1.id - book2.id)
      break
    case 'Rate':
      books.sort((book1, book2) => book1.rate - book2.rate)
      break
  }

  var startIdx = gPageIdx * PAGE_SIZE

  return books.slice(startIdx, startIdx + PAGE_SIZE)
  //   return books
}

function setGSortBy(elThead) {
  gSortBy = elThead
}

function setGCurrBookId(bookId) {
  gCurrBookId = bookId
}

function nextPage() {
  gPageIdx++
  if (gPageIdx * PAGE_SIZE >= gBooks.length) {
    gPageIdx = 0
  }
}

function removeBook(bookId) {
  const bookIdx = gBooks.findIndex((book) => bookId === book.id)
  console.log(bookIdx)
  gBooks.splice(bookIdx, 1)
  _saveBooksToStorage()
}

function addBook(name, price) {
  gBooks.push({ id: '' + gNextId++, title: name, price: price, rate: 0 })
  _saveBooksToStorage()
}

function getBookById(bookId) {
  const book = gBooks.find((book) => bookId === book.id)
  return book
}

function updateBookPrice(bookId, price) {
  console.log('bookId', bookId)
  console.log('price', price)
  const book = gBooks.find((book) => bookId === book.id)
  book.price = price
  _saveBooksToStorage()
}

function updateBookRate(bookId, diff) {
  const book = gBooks.find((book) => bookId === book.id)
  if (book.rate + diff < 0 || book.rate + diff > 9) return
  book.rate += diff
  _saveBooksToStorage()
}

function setBookFilter(filterBy = {}) {
  gPageIdx = 0
  if (filterBy.minRate !== undefined) gFilterBy.minRate = filterBy.minRate
  if (filterBy.maxPrice !== undefined) gFilterBy.maxPrice = filterBy.maxPrice
  if (filterBy.searchTxt !== undefined) gFilterBy.searchTxt = filterBy.searchTxt
  return gFilterBy
}

function _saveBooksToStorage() {
  saveToStorage(STORAGE_KEY, gBooks)
}
