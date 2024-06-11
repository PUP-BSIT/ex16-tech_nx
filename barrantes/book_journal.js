function submitUser() {
    const Book_Name = document.querySelector("#book_name").value;
    const Book_Genre = document.querySelector("#book_genre").value;
    const Release_Date = document.querySelector("#release_date").value;
    const Author = document.querySelector("#author").value;
    const Rating = document.querySelector("#aating").value;

    fetch("./book_journal.php", {
        method: "POST",
        headers: {
            "Content-type": "application/x-www-form-urlencoded"
        },
        body: `Book_Name=${Book_Name}&Book_Genre=${Book_Genre}
        &Release_Date=${Release_Date}&Author=${Author}&Rating=${Rating}`
    })
    .then(response => response.text())
    .then(responseText => {
        alert(responseText);
    });
}

function bookList() {
const table = document.querySelector("#book_list");
fetch("./book_journal.php")
  .then((response) => response.json())
  .then((bookList) => {
    for (const books of bookList) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${books.id}</td>
        <td>${books.bkname}</td>
        <td>${books.bkgenre}</td>
        <td>${books.releasdt}</td>
        <td>${books.author}</td>
        <td>${books.rating}</td>`;
      table.append(row);
    }
  });
}
document.getElementById("get_books").addEventListener("click", bookList);

function updateBook() {
    const id = document.querySelector("#update_id").value;
    const bookName = document.querySelector("#update_book_name").value;
    const bookGenre = document.querySelector("#update_book_genre").value;
    const releaseDate = document.querySelector("#update_release_date").value;
    const author = document.querySelector("#update_author").value;
    const rating = document.querySelector("#update_rating").value;

    fetch('./book_journal.php', {
        method: 'PATCH', 
        body: `ID=${id}&Book_Name=${bookName}&Book_Genre=${bookGenre}
        &Release_Date=${releaseDate}&Author=${author}&Rating=${rating}`
    })
    .then(response => response.text())
    .catch(error => console.error('Error:', error));
}

function deleteBook(id) {
    fetch('./book_journal.php', {
        method: 'DELETE', 
        body: `ID=${id}`
    })
    .then(response => response.text())
    .catch(error => console.error('Error:', error));
}

function deleteBookEntry(event) {
    const row = event.target.parentNode.parentNode; 
    const id = row.cells[0].textContent; 

    deleteBook(id);

    row.parentNode.removeChild(row);
}

document.addEventListener("DOMContentLoaded", function() {
    const table = document.getElementById("book_list");
    const rows = table.getElementsByTagName("tr");
    
    for (let i = 1; i < rows.length; i++) { 
        const cell = rows[i].insertCell(-1);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = deleteBookEntry;
        cell.appendChild(deleteButton);
    }
});


