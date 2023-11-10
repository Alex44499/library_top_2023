// DOM element selection
const addNewBookBtn = document.querySelector("#addBookBtn"); // 'Add a book' button
const grid = document.querySelector(".library-catalog"); // The grid where books are displayed
const hiddenForm = document.querySelector(".hidden-form"); // The form used to enter new book details
const returnCatalogButton = document.querySelector("#returnBtn"); // 'Return' button to go back to the grid view
const bookForm = document.querySelector("#bookForm"); // The form element itself

// Data structure
const library = []; // Holds the collection of books

// Book constructor function
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Adds a new book to the library array and updates the display
function addBookToLibrary(title, author, pages, status) {
  const newBook = new Book(title, author, pages, status);
  library.push(newBook); // Adds the new book to the library array
  displayBooks(); // Updates the display to include the new book
}

// Updates the display to show all books in the library
function displayBooks() {
  const entriesContainer = document.querySelector(".library-entries");
  entriesContainer.innerHTML = ""; // Clears the current display

  // Creates and appends HTML elements for each book in the library
  library.forEach((book) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-entry");

    // Creates a div for each property of a book and appends to the book div
    const titleDiv = document.createElement("div");
    titleDiv.textContent = book.title;
    bookDiv.appendChild(titleDiv);

    const authorDiv = document.createElement("div");
    authorDiv.textContent = book.author;
    bookDiv.appendChild(authorDiv);

    const pagesDiv = document.createElement("div");
    pagesDiv.textContent = book.pages;
    bookDiv.appendChild(pagesDiv);

    const statusDiv = document.createElement("div");
    statusDiv.textContent = book.status;
    bookDiv.appendChild(statusDiv);

    const editBtn = document.createElement("BUTTON");
    bookDiv.appendChild(editBtn);
 

    // Appends the book div to the container for entries
    entriesContainer.appendChild(bookDiv);
  });
}

// Event listeners
addNewBookBtn.addEventListener("click", () => {
  // Toggles the display between the grid and the form
  grid.style.display = "none";
  hiddenForm.style.display = "flex";
  addNewBookBtn.style.display = "none";
});

returnCatalogButton.addEventListener("click", () => {
  // Toggles the display back to the grid from the form
  grid.style.display = "grid";
  hiddenForm.style.display = "none";
  addNewBookBtn.style.display = "block";
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault(); // Prevents the default form submission action

  // Retrieves values from the form and adds the new book to the library
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.querySelector('input[name="readBook"]:checked').value;

  addBookToLibrary(title, author, pages, status); // Invokes function to add the book and update the display

  // Resets the form fields and toggles the display back to the grid
  bookForm.reset();
  grid.style.display = "grid";
  hiddenForm.style.display = "none";
  addNewBookBtn.style.display = "block";
});
