const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8228691-L.jpg" },
    { id: 3, title: "1984", author: "George Orwell", genre: "Dystopian", borrowed: false, cover: "https://covers.openlibrary.org/b/id/7222246-L.jpg" },
    { id: 4, title: "The Catcher in the Rye", author: "J.D. Salinger", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231856-L.jpg" },
    { id: 5, title: "The Hobbit", author: "J.R.R. Tolkien", genre: "Fantasy", borrowed: false, cover: "https://covers.openlibrary.org/b/id/6979861-L.jpg" },
    { id: 6, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", genre: "Fantasy", borrowed: false, cover: "https://covers.openlibrary.org/b/id/7984916-L.jpg" },
    { id: 7, title: "The Road", author: "Cormac McCarthy", genre: "Post-Apocalyptic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231991-L.jpg" },
    { id: 8, title: "Pride and Prejudice", author: "Jane Austen", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8091016-L.jpg" },
    { id: 9, title: "The Alchemist", author: "Paulo Coelho", genre: "Adventure", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231992-L.jpg" },
    { id: 10, title: "Moby Dick", author: "Herman Melville", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231993-L.jpg" },
    { id: 11, title: "War and Peace", author: "Leo Tolstoy", genre: "Historical", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231994-L.jpg" },
    { id: 12, title: "The Odyssey", author: "Homer", genre: "Epic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231995-L.jpg" },
    { id: 13, title: "Crime and Punishment", author: "Fyodor Dostoevsky", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231996-L.jpg" },
    { id: 14, title: "The Divine Comedy", author: "Dante Alighieri", genre: "Epic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231997-L.jpg" },
    { id: 15, title: "The Brothers Karamazov", author: "Fyodor Dostoevsky", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231998-L.jpg" },
    { id: 16, title: "Les Misérables", author: "Victor Hugo", genre: "Historical", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8231999-L.jpg" },
    { id: 17, title: "Don Quixote", author: "Miguel de Cervantes", genre: "Classic", borrowed: false, cover: "https://covers.openlibrary.org/b/id/8232000-L.jpg" },
];

// Borrowing history array
let borrowingHistory = [];

// DOM elements
const searchInput = document.getElementById('search-input');
const categoriesList = document.getElementById('categories-list');
const booksList = document.getElementById('books-list');
const historyList = document.getElementById('history-list');

let activeCategory = null;

// Initialize app
function init() {
    renderCategories();
    renderBooks(books);
    renderHistory();

    // Navigation links
    const homeLink = document.getElementById('home-link');
    const historyLink = document.getElementById('hstory-link');

    const searchSection = document.getElementById('search-section');
    const categoriesSection = document.getElementById('categories-section');
    const booksSection = document.getElementById('books-section');
    const historySection = document.getElementById('history-section');

    homeLink.addEventListener('click', (e) => {
        e.preventDefault();
        searchSection.style.display = 'block';
        categoriesSection.style.display = 'block';
        booksSection.style.display = 'block';
        historySection.style.display = 'none';
    });

    historyLink.addEventListener('click', (e) => {
        e.preventDefault();
        searchSection.style.display = 'none';
        categoriesSection.style.display = 'none';
        booksSection.style.display = 'none';
        historySection.style.display = 'block';
    });
}

// Render categories dynamically based on book genres
function renderCategories() {
    const genres = [...new Set(books.map(book => book.genre))];
    categoriesList.innerHTML = '';

    // Add "All" category
    const allCategory = document.createElement('div');
    allCategory.textContent = 'All';
    allCategory.classList.add('category-item', 'active');
    allCategory.addEventListener('click', () => {
        activeCategory = null;
        setActiveCategory(allCategory);
        renderBooks(books);
    });
    categoriesList.appendChild(allCategory);

    genres.forEach(genre => {
        const categoryItem = document.createElement('div');
        categoryItem.textContent = genre;
        categoryItem.classList.add('category-item');
        categoryItem.addEventListener('click', () => {
            activeCategory = genre;
            setActiveCategory(categoryItem);
            filterBooks();
        });
        categoriesList.appendChild(categoryItem);
    });
}

// Set active category styling
function setActiveCategory(selectedCategory) {
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => item.classList.remove('active'));
    selectedCategory.classList.add('active');
}

// Render books list
function renderBooks(bookArray) {
    booksList.innerHTML = '';
    if (bookArray.length === 0) {
        booksList.innerHTML = '<li>No books found.</li>';
        return;
    }
    bookArray.forEach(book => {
        const li = document.createElement('li');
        li.classList.add('book-item');

        const coverImg = document.createElement('img');
        coverImg.src = book.cover;
        coverImg.alt = `${book.title} cover`;
        coverImg.classList.add('book-cover');

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('book-info');
        infoDiv.innerHTML = `<div class="book-title">${book.title}</div><div class="book-author">by ${book.author}</div>`;

        const borrowButton = document.createElement('button');
        borrowButton.textContent = book.borrowed ? 'Return' : 'Borrow';
        borrowButton.classList.add('borrow-button');
        borrowButton.addEventListener('click', () => toggleBorrow(book.id));

        li.appendChild(coverImg);
        li.appendChild(infoDiv);
        li.appendChild(borrowButton);
        booksList.appendChild(li);
    });
}

// Toggle borrow/return status
function toggleBorrow(bookId) {
    const book = books.find(b => b.id === bookId);
    if (!book) return;

    book.borrowed = !book.borrowed;

    // Add to borrowing history if borrowed
    if (book.borrowed) {
        borrowingHistory.unshift({
            id: book.id,
            title: book.title,
            date: new Date().toLocaleString()
        });
    }

    renderBooks(filterBooks());
    renderHistory();
}

// Render borrowing history
function renderHistory() {
    historyList.innerHTML = '';
    if (borrowingHistory.length === 0) {
        historyList.innerHTML = '<li>No borrowing history.</li>';
        return;
    }
    borrowingHistory.forEach(entry => {
        const li = document.createElement('li');
        li.classList.add('history-item');
        li.textContent = `${entry.title} borrowed on ${entry.date}`;
        historyList.appendChild(li);
    });
}

// Filter books based on search input and active category
function filterBooks() {
    const searchTerm = searchInput.value.toLowerCase();
    let filtered = books.filter(book => {
        const matchesSearch = book.title.toLowerCase().includes(searchTerm) ||
            book.author.toLowerCase().includes(searchTerm) ||
            book.genre.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory ? book.genre === activeCategory : true;
        return matchesSearch && matchesCategory;
    });
    renderBooks(filtered);
    return filtered;
}

// Event listener for search input
searchInput.addEventListener('input', filterBooks);

// Initialize the app on page load
window.addEventListener('DOMContentLoaded', init);
