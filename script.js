let myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;

    this.info = function() {
        readString = this.read ? 'read' : 'not read yet';
        return `${this.title} by ${this.author}, ${pages} pages, ${readString}`;
    }
}

function addBookToLibrary(title, author, pages, read) {
    let book = new Book(title, author, pages, read);
    myLibrary.push(book);
}

addBookToLibrary('The Hobbit', 'J.R.R Tolkein', 295, true);
addBookToLibrary('Jobs', 'Walter', 545, false);

let shelf = document.getElementById('shelf');

myLibrary.forEach(element => {
    renderBook(element.title, element.author, element.pages, element.read, myLibrary.indexOf(element));
});

function renderBook(title, author, pages, read, idx) {
    let bookDiv = document.createElement('div');
    bookDiv.className = 'book';

    let titleDiv = document.createElement('h1')
    titleDiv.textContent = title;

    let authorDiv = document.createElement('p');
    authorDiv.textContent = author;

    let pagesDiv = document.createElement('p');
    pagesDiv.textContent = pages;

    let readDiv = document.createElement('button');
    readDiv.classList.add('read');
    readDiv.addEventListener('click', onReadClick);
    
    if (read) {
        readDiv.textContent = 'Read';
    } else {
        readDiv.textContent = 'Not Read';
        readDiv.classList.add('unread');
    }
    
    let deleteDiv = document.createElement('button');
    deleteDiv.textContent = 'x';
    deleteDiv.classList.add('delete');
    deleteDiv.addEventListener('click', onDeleteClick);

    bookDiv.appendChild(titleDiv);
    bookDiv.appendChild(authorDiv);
    bookDiv.appendChild(pagesDiv);
    bookDiv.appendChild(readDiv);
    bookDiv.appendChild(deleteDiv);
    bookDiv.setAttribute('data-idx', idx);

    shelf.appendChild(bookDiv);
}

let modal = document.getElementById('myModal');

let btn = document.getElementById('addBook');

btn.onclick = () => {
    modal.style.display = 'block';
}

let form = document.querySelector('form');
let submitButton = document.querySelector('#formSubmit');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    var title = form[0].value;
    var author = form[1].value;
    var pages = form[2].value;
    var read = form[3].checked;
    
    var idx = myLibrary.length;

    addBookToLibrary(title, author, pages, read);
    renderBook(title, author, pages, read, idx);
    
    modal.style.display = 'none';
});

function onDeleteClick(e) {
    var bookToDelete = e.target.parentElement;
    var idxToDelete = bookToDelete.getAttribute('data-idx');

    shelf.removeChild(bookToDelete);
}

function onReadClick(e) {
    var bookDiv = e.target.parentElement;
    var bookIdx = bookDiv.getAttribute('data-idx');
    var book = myLibrary[bookIdx];
    if (book.read) {
        book.read = false;
        e.target.classList.add('unread');
        e.target.textContent = 'Not Read';
    } else {
        book.read = true;
        e.target.classList.remove('unread');
        e.target.textContent = 'Read';
    }
}
