// Select DOM elements
const addNewBookBtn = document.querySelector("#addBookBtn");
const grid = document.querySelector(".library-catalog");
const hiddenForm = document.querySelector(".hidden-form");
const bookForm = document.querySelector("#bookForm");
const returnCatalogButton = document.querySelector("#returnBtn");

// Initialize library array
const library = [];

// Book constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Add or update a book in the library
function addOrUpdateBook(title, author, pages, status, index) {
  if (index !== undefined) {
    library[index] = new Book(title, author, pages, status);
  } else {
    library.push(new Book(title, author, pages, status));
  }
  displayBooks();
}

// Display books in the library
function displayBooks() {
  const entriesContainer = document.querySelector(".library-entries");
  entriesContainer.innerHTML = ""; // Clear existing entries

  library.forEach((book, index) => {
    const bookDiv = document.createElement("div");
    bookDiv.classList.add("book-entry");

    // Add title, author, pages (not shown for brevity)
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

    // Status and action buttons container
    const statusAndButtonsDiv = document.createElement("div");
    statusAndButtonsDiv.classList.add("status-buttons-container");

    // Status display
    const statusDiv = document.createElement("div");
    statusDiv.textContent = book.status;
    statusAndButtonsDiv.appendChild(statusDiv);

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");
    editBtn.addEventListener("click", () => editBook(index));
    statusAndButtonsDiv.appendChild(editBtn);

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteBook(index));
    statusAndButtonsDiv.appendChild(deleteBtn);

    // Append status and buttons container to book div
    bookDiv.appendChild(statusAndButtonsDiv);

    // Append book entry to the grid container
    entriesContainer.appendChild(bookDiv);
  });
}

// Edit book function
function editBook(index) {
  const book = library[index];
  // Populate form fields with book info for editing
  document.getElementById("title").value = book.title;
  document.getElementById("author").value = book.author;
  document.getElementById("pages").value = book.pages;
  document.querySelector(
    `input[name="readBook"][value="${book.status}"]`
  ).checked = true;

  // Show the form and hide the grid
  hiddenForm.style.display = "flex";
  grid.style.display = "none";
  addNewBookBtn.style.display = "none";

  // Set a data attribute on the form to indicate we're editing
  bookForm.dataset.index = index;
}

// Delete book function
function deleteBook(index) {
  if (confirm("Are you sure you want to delete this book?")) {
    library.splice(index, 1); // Remove the book from the array
    displayBooks(); // Update the display
  }
}

// Event listeners
addNewBookBtn.addEventListener("click", () => {
  // Reset form and remove the editing index
  bookForm.reset();
  delete bookForm.dataset.index;

  // Show the form for adding a new book
  hiddenForm.style.display = "flex";
  grid.style.display = "none";
  addNewBookBtn.style.display = "none";
});

returnCatalogButton.addEventListener("click", () => {
  // Return to the grid display
  hiddenForm.style.display = "none";
  grid.style.display = "grid";
  addNewBookBtn.style.display = "block";
});

bookForm.addEventListener("submit", (event) => {
  event.preventDefault();

  // Get form values
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const status = document.querySelector('input[name="readBook"]:checked').value;

  // Determine if we're adding or updating based on the presence of an index
  const index = bookForm.dataset.index
    ? parseInt(bookForm.dataset.index)
    : undefined;
  addOrUpdateBook(title, author, pages, status, index);

  // Reset the form and update the display
  bookForm.reset();
  delete bookForm.dataset.index;

  // Show the grid and hide the form
  hiddenForm.style.display = "none";
  grid.style.display = "grid";
  addNewBookBtn.style.display = "block";
});

// Initial display of books
displayBooks();
