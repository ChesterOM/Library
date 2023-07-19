let myLibrary = [];
const form = document.getElementById("form-info");

function Book(title, author, read){
  this.title = title
  this.author = author
  this.read = read
  this.info = function() {
      return this.title + " by " + this.author + ", " + this.read;
    };
}

function addBookToLibrary(title, author, read){
  const newBook = new Book(title, author, read);
  myLibrary.push(newBook);

  displayLibrary();
};

function displayLibrary(){
  const tableBody = document.getElementById("book-table-body");
  
  tableBody.innerHTML = "";
  
  myLibrary.forEach(function(book, index) {
    const row = document.createElement("tr");

    const titleCell = document.createElement("td");
    titleCell.textContent = book.title;
    row.appendChild(titleCell);

    const autherCell = document.createElement("td");
    autherCell.textContent = book.author;
    row.appendChild(autherCell);

    const readCell = document.createElement("td");
    const statusButton = document.createElement("button");
    statusButton.classList.add("status-button");
    statusButton.textContent = book.read;
    statusButton.addEventListener("click", function(){
      changeStatus(index);
    });
    readCell.appendChild(statusButton);
    row.appendChild(readCell);

    const deleteCell = document.createElement("td");
    const deleteButton = document.createElement("button");
    deleteButton.classList.add("delete");
    deleteButton.textContent = "delete";
    deleteButton.addEventListener("click", function(){
      removeBook(index);
    })
    deleteCell.appendChild(deleteButton);
    row.appendChild(deleteCell);

    tableBody.appendChild(row);
  })
};

 function changeStatus(index){
  const book = myLibrary[index];
  book.read = book.read ==="read" ? "Not Read" : "read";

  displayLibrary()
 }

 function removeBook(index){
  myLibrary.splice(index, 1);
  displayLibrary()
 }


form.addEventListener("submit", function(event){
  event.preventDefault();

  const formData = new FormData(form);
  const title = formData.get("title");
  const author = formData.get("author");
  const read = formData.get("read");
  
  addBookToLibrary(title, author, read);

  form.reset();
  console.log(myLibrary);
  displayLibrary();
});


addBookToLibrary("Harry Potter", "J.K. Rowling", "Read");
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", "Not Read")
addBookToLibrary("Deez", "Nutz", "Not Read")
displayLibrary()