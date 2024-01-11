
// library array to store books

const myLibrary = [];

// constructor function

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
    this.info = function () {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    };

    this.toggleReadStatus = function () {
        this.isRead = !this.isRead;
    };
};

// function to take user input and store new object in the array

function addBookToLibrary(title, author, pages, isRead) {

    let bookObj = new Book(title, author, pages, isRead);

    myLibrary.push(bookObj);

}


// function to display each book


function displayBook() {

    let display = document.querySelector('.display');

    display.innerHTML = '';
    myLibrary.forEach(function (book, index) {
        let cardDiv = document.createElement('div');
        cardDiv.classList.add('book-card');

        let titleText = document.createElement('p');
        titleText.textContent = ` ${book.title}`;

        let authorText = document.createElement('p');
        authorText.textContent = `by ${book.author}`;


        let pagesText = document.createElement('p');
        pagesText.textContent = `${book.pages}`;


        // let isReadText = document.createElement('p');
        // isReadText.textContent = `Read: ${book.isRead ? 'Yes' : 'No'}`;

        let readStatusBtn = document.createElement('button');
        // readStatusBtn.textContent = book.isRead ? 'Read' : 'Not Read';
        if (book.isRead) {
            readStatusBtn.textContent = 'Read';
            readStatusBtn.style.backgroundColor = 'rgb(2, 168, 2)';
        } else {
            readStatusBtn.textContent = 'Not Read';
            readStatusBtn.style.backgroundColor = 'rgb(255, 79, 79)'
        }

        readStatusBtn.addEventListener('click', function () {
            book.toggleReadStatus();
            displayBook();
        })

        let removeBtn = document.createElement('button');
        removeBtn.innerText = 'Remove'
        removeBtn.dataset.index = index;

        removeBtn.addEventListener('click', () => {
            let indexOfClickedButton = removeBtn.dataset.index;
            myLibrary.splice(indexOfClickedButton, 1);
            displayBook();
        })


        cardDiv.appendChild(titleText);
        cardDiv.appendChild(authorText);
        cardDiv.appendChild(pagesText);
        // cardDiv.appendChild(isReadText);
        cardDiv.appendChild(readStatusBtn);
        cardDiv.appendChild(removeBtn);


        display.appendChild(cardDiv);
    })
}



let dialog = document.querySelector('dialog');
let addBtn = document.querySelector('.add-book');
let closeBtn = document.querySelector('.closeBtn');

// button to show form

addBtn.addEventListener('click', () => {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#pages').value = '';
    document.querySelector('#isRead').checked = false;

    dialog.showModal();
})

// button to close the form display

closeBtn.addEventListener('click', () => {
    if (dialog.open) {
        dialog.close();
        displayBook();
    }
})


let form = document.querySelector('.form');

form.addEventListener('submit', (e) => {
    e.preventDefault();

})

let submitBtn = document.querySelector('.submitBtn');

// sumit button to display the book
submitBtn.addEventListener('click', () => {
    let title = document.querySelector('#title').value;
    let author = document.querySelector('#author').value;
    let pages = document.querySelector('#pages').value;
    let isRead = document.querySelector('#isRead').checked;

    addBookToLibrary(title, author, pages, isRead);
    displayBook();
    dialog.close();
})

