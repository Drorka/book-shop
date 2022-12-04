'use strict'

function onInit() {
  renderBooks()
}

function renderBooks() {
  const books = getBooks()
  const strHTMLs = books.map(
    (book) => `<tr>
    <td>${book.id}</td>
    <td>${book.title}</td>
    <td>${book.price}</td>
    <td>${book.rate}</td>
    <td> <button onclick="onRead('${book.id}')">Read</button></td>
    <td> <button onclick="onUpdateBook('${book.id}')">Update</button></td>
    <td> <button onclick="onRemoveBook('${book.id}')">Delete</button></td>
</tr>`
  )
  document.querySelector('.books-tbody').innerHTML = strHTMLs.join('')
}

function onRemoveBook(bookId) {
  console.log('bookId', bookId)
  removeBook(bookId)
  renderBooks()
}

function onAddBook() {
  const newBookName = prompt('Enter book name')
  const newBookPrice = +prompt('Enter book price')
  addBook(newBookName, newBookPrice)
  renderBooks()
}

function onUpdateBook(bookId) {
  console.log(bookId)
  const updatedBookPrice = +prompt('Enter new price')
  updateBookPrice(bookId, updatedBookPrice)
  renderBooks()
}

function onRead(bookId) {
  setGCurrBookId(bookId)
  var book = getBookById(bookId)

  var elModal = document.querySelector('.modal')
  elModal.querySelector('h3').innerText = book.title
  elModal.querySelector('.price span').innerText = book.price
  elModal.querySelector('.rate span').innerText = book.rate
  elModal.style.display = 'block'
}

function onSetRate(diff) {
  updateBookRate(gCurrBookId, diff)
  var book = getBookById(gCurrBookId)
  var elRate = document.querySelector('.rate span')
  elRate.innerText = book.rate
  renderBooks()
}

function onCloseModal() {
  document.querySelector('.modal').style.display = 'none'
}

function onSetFilterBy(filterBy) {
  filterBy = setBookFilter(filterBy)
  renderBooks()

  const queryStringParams = `?maxPrice=${filterBy.maxPrice}&minRate=${filterBy.minRate}&searchTxt=${filterBy.searchTxt}`
  const newUrl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    queryStringParams
  window.history.pushState({ path: newUrl }, '', newUrl)
}

function onSearchBook(ev) {
  ev.preventDefault()
  const elTxt = document.querySelector('input[name="search-book"]')
  const searchTxt = elTxt.value.toLowerCase()
  console.log('searchTxt', searchTxt)
  onSetFilterBy({ searchTxt: searchTxt })
  renderBooks()
}

function onSort(thead) {
  const elThead = thead.innerText
  setGSortBy(elThead)
  renderBooks()
}

function onNextPage() {
  nextPage()
  renderBooks()
}
