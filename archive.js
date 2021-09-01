const errorDiv = document.getElementById('error');
errorDiv.style.display = 'none';

const searchBooks = async () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    // console.log(inputFieldValue);
    inputField.value = '';

    if (inputFieldValue === '') {
        displayError('block');
    } else {
        const url = `http://openlibrary.org/search.json?q=${inputFieldValue}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            showBooks(data.docs);
        } catch (error) {
            displayError('block');
        }
    }
};

const showBooks = books => {
    // console.log(books);

    const displayBooksDiv = document.getElementById('display-books');
    displayBooksDiv.textContent = '';

    books.forEach(book => {
        console.log(book);

        const div = document.createElement('div');

        if (book.hasOwnProperty('cover_i') === true) {
            div.classList.add('col');
            div.innerHTML = `
                
                <div class="card h-100">
                    <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <h5 class="card-title"><span class="fw-bold">Book:</span> ${book.title_suggest}</h5>
                        <h5 class="card-title"><span class="fw-bold">First Publish Year:</span> ${book.first_publish_year}</h5>
                        <h5 class="card-title"><span class="fw-bold">Author:</span> ${book.author_name}</h5>
                        <h5 class="card-title"><span class="fw-bold">Publisher:</span> ${book.publisher}</h5>
                    </div>
                </div> 
            `;
            displayBooksDiv.appendChild(div);
        }
    });
    displayError('none');
}

// error function
const displayError = error => {
    errorDiv.style.display = error;
}