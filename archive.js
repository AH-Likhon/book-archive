const displayBooksDiv = document.getElementById('display-books');
const showResults = document.getElementById('show-results');

const errorDiv = document.getElementById('error');
errorDiv.style.display = 'none';

// load books
const searchBooks = async () => {
    const inputField = document.getElementById('input-field');
    const inputFieldValue = inputField.value;
    // console.log(inputFieldValue);

    // clear content
    inputField.value = '';
    showResults.textContent = '';
    displayBooksDiv.textContent = '';

    if (inputFieldValue === '') {
        displayError('block');
    } else {
        const url = `https://openlibrary.org/search.json?q=${inputFieldValue}`;

        try {
            const res = await fetch(url);
            const data = await res.json();
            showBooks(data.docs);
        } catch (error) {
            displayError('block');
        }
    }
};


// display books details
const showBooks = books => {
    // console.log(books.length);

    books.forEach(book => {
        // console.log(book.length);
        const searchBooksLength = books.filter(book => book.hasOwnProperty('cover_i') === true).length;
        showResults.innerHTML = `
           <h5 class='fw-bold text-center'>Founded Results: ${searchBooksLength}</h5>
        `;

        const div = document.createElement('div');


        if (book.hasOwnProperty('cover_i') === true) {

            div.classList.add('col');
            div.innerHTML = `

                <div onclick="singleBookDetails()" class="card h-100">
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
};

// error function
const displayError = error => {
    errorDiv.style.display = error;
}