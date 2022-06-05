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

addBookToLibrary('The Hobbit', 'J.R.R Tolkein', 295, 'not read');
addBookToLibrary('Jobs', 'Walter', 545, 'not read');
addBookToLibrary('Jobs', 'Walter', 545, 'not read');
addBookToLibrary('Jobs', 'Walter', 545, 'not read');
addBookToLibrary('Jobs', 'Walter', 545, 'not read');

let shelf = document.getElementById('shelf');

myLibrary.forEach(element => {
    console.log(element.info());
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

    let readDiv = document.createElement('p');
    readDiv.textContent = read;

    let deleteDiv = document.createElement('button');
    deleteDiv.textContent = 'x';
    deleteDiv.id = 'delete';

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
console.log(form);

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    var title = form[0].value;
    var author = form[1].value;
    var pages = form[2].value;
    var read = form[3].value;
    
    var idx = myLibrary.length;

    addBookToLibrary(title, author, pages, 'not read');
    renderBook(title, author, pages, 'not read', idx);
    
    modal.style.display = 'none';
});

function onDeleteClick(e) {
    var bookToDelete = e.target.parentElement;
    var idxToDelete = bookToDelete.getAttribute('data-idx');
    myLibrary.shift(idxToDelete);

    shelf.removeChild(bookToDelete);
    console.log(myLibrary);
}

let bookDeletes = document.querySelectorAll('.book button');
bookDeletes.forEach(element => element.addEventListener('click', onDeleteClick));

console.log(myLibrary.length);