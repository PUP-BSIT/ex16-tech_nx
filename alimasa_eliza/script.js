let comments = [];

function writeNewComment() {
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  let timestamp = new Date();

  let commentObject = { name, comment, timestamp };

  comments.push(commentObject);
  sortComments();
  displayComments();

  document.getElementById('name').value = '';
  document.getElementById('comment').value = '';
  document.getElementById('save_button').disabled = true;
}

function displayComments() {
  let comment_list = document.getElementById('comment_list');
  comment_list.innerHTML = '';

  comments.forEach(comment => {
    let li = document.createElement('li');
    li.innerHTML = `${comment.comment} - <b>${comment.name}</b> <br><small>${new Date(comment.timestamp).toLocaleString()}</small>`;
    comment_list.appendChild(li);
  });
}

function sortComments(order) {
    if (order === 'asc') {
      comments.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    } else {
      comments.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
    }
    displayComments();
}

document.getElementById('asc_button').addEventListener('click', function() {
  sortComments('asc');
});

document.getElementById('desc_button').addEventListener('click', function() {
  sortComments('desc');
});

document.getElementById('comment_form').addEventListener('submit', function(event) {
  event.preventDefault();
  addComment();
});

document.getElementById('name').addEventListener('input', verification);
document.getElementById('comment').addEventListener('input', verification);

function verification() {
  let name = document.getElementById('name').value;
  let comment = document.getElementById('comment').value;
  document.getElementById('save_button').disabled = !(name && comment);
}