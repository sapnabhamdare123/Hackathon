document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const bookContainer = document.getElementById('book-container');
    const bookDetail = document.getElementById('book-detail');
    const bookDetailContent = document.getElementById('book-detail-content');
    const closeDetailButton = document.getElementById('close-detail');

    let booksData = [];

    // Fetch the JSON data
    fetch('data2.json')
        .then(response => response.json())
        .then(data => {
            booksData = data.books;
            loadBooks(booksData); // Initial load of books
        })
        .catch(error => console.error('Error fetching the books data:', error));

    searchBar.addEventListener('input', () => loadBooks(booksData));

    function loadBooks(booksData) {
        const query = searchBar.value.toLowerCase();
        const filteredBooks = booksData.filter(book => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query));

        bookContainer.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <img src="${book.coverImage}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h3>${book.title}</h3>
                    <p>by ${book.author}</p>
                </div>
            `;
            bookElement.addEventListener('click', () => showBookDetails(book));
            bookContainer.appendChild(bookElement);
        });
    }

    function showBookDetails(book) {
        bookDetail.style.display = 'block';
        bookDetailContent.innerHTML = `
            <div>
                <img src="${book.coverImage}" alt="${book.title}" class="book-cover">
                <div class="book-info">
                    <h2>${book.title}</h2>
                    <p>by ${book.author}</p>
                    <p>Released: ${book.releaseDate}</p>
                    <p>Genre: ${book.genre}</p>
                    <h3>Reviews:</h3>
                    <ul>
                        ${book.reviews.map(review => `<li>${review}</li>`).join('')}
                    </ul>
                </div>
                <div class="book-actions">
                    <button id="add-to-favorites">Add to Favorites</button>
                </div>
            </div>
        `;

        // Event listener for closing the detail view on double click
        bookDetail.addEventListener('dblclick', () => {
            bookDetail.style.display = 'none';
        });

        // Event listeners for buttons
        const addToFavoritesButton = document.getElementById('add-to-favorites');
        // const readBookButton = document.getElementById('read-book');

        addToFavoritesButton.addEventListener('click', () => {
            // Handle adding to favorites functionality here
            console.log('Added to Favorites:', book.title);
        });
    }

    // Close detail view button
    closeDetailButton.addEventListener('click', () => {
        bookDetail.style.display = 'none';
    });
});
