document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("name");
  const commentInput = document.getElementById("comment");
  const commentBtn = document.getElementById("comment_btn");
  const sortAscBtn = document.getElementById("sort_asc_btn");
  const sortDescBtn = document.getElementById("sort_desc_btn");

  if (nameInput && commentInput && commentBtn) {
    nameInput.addEventListener("input", toggleCommentButton);
    commentInput.addEventListener("input", toggleCommentButton);
  }

  if (commentBtn) {
    commentBtn.addEventListener("click", addComment);
  }

  if (sortAscBtn) {
    sortAscBtn.addEventListener("click", function () {
      sortComments('asc');
    });
  }

  if (sortDescBtn) {
    sortDescBtn.addEventListener("click", function () {
      sortComments('desc');
    });
  }

  let comments = [];

  function toggleCommentButton() {
    const nameValue = nameInput.value.trim();
    const commentValue = commentInput.value.trim();
    
    if (nameValue && commentValue) {
      commentBtn.removeAttribute("disabled");
    } else {
      commentBtn.setAttribute("disabled", "disabled");
    }
  }

  function addComment() {
    const name = nameInput.value.trim();
    const commentText = commentInput.value.trim();
    const timestamp = new Date();

    if (name && commentText) {
      comments.push({ name, text: commentText, date: timestamp });
      displayComments();
      nameInput.value = '';
      commentInput.value = '';
      toggleCommentButton();
    }
  }

  function displayComments() {
    const commentsSection = document.getElementById
    ('commentsSection');
    commentsSection.innerHTML = '';

    comments.forEach(function (comment) {
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');
      commentDiv.innerHTML = `
        <strong>${comment.name}</strong>
        <time>(${new Date(comment.date)
          .toLocaleString()})</time>
        <p>${comment.text}</p>
      `;
      commentsSection.appendChild(commentDiv);
    });
  }

  function sortComments(order) {
    comments.sort(function (a, b) {
      return order === 'asc' ? new Date(a.date) - 
      new Date(b.date) : new Date(b.date) - new Date(a.date);
    });
    displayComments();
  }
});

  function searchCountry() {
    let countryName = document.getElementById
    ('country_Input').value.trim();
    if (!countryName) {
      document.getElementById('country_Details').innerHTML = 
          '<p>Please provide a country name.</p>';
      document.getElementById('same_Region_Countries').innerHTML = '';
      return;
  }
  
  fetch('https://restcountries.com/v3.1/name/' + countryName)
  .then(function(response) {
      if (!response.ok) {
          throw new Error('This Country  is not found');
      }
      return response.text();
  })
  .then(function(countryData) {
      let country = JSON.parse(countryData)[0];
      let details = `
          <h2>Country Details - ${country.name.common}</h2>
          <img src="${country.flags.svg}" 
          alt="Flag of ${country.name.common}" width="100">
          <p><strong>Area:</strong> ${country.area ?
               country.area.toLocaleString() +
                ' square kilometers' : 'N/A'}</p>
          <p><strong>Languages:</strong> ${country.languages ?
               Object.values(country.languages).join(', ') : 'N/A'}</p>
          <p><strong>Subregion:</strong> ${country.subregion ? 
              country.subregion : 'N/A'}</p>
          <p><strong>Capital:</strong> ${country.capital ? 
              country.capital[0] : 'N/A'}</p>
          <p><strong>Timezones:</strong> ${country.timezones ? 
              country.timezones.join(', ') : 'N/A'}</p>
      `;
      document.getElementById('country_Details').innerHTML = details;
      
      return fetch('https://restcountries.com/v3.1/region/' + 
          country.region);
  })
  .then(function(response) {
      if (!response.ok) {
          throw new Error('This Region is not found');
      }
      return response.text();
  })
  .then(function(regionData) {
      let region = JSON.parse(regionData)[0].region;
      let sameRegionCountriesList = JSON.parse(regionData).map(function(c) {
          return `
              <div class="country-card">
                  <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" 
                  width = "50px">
                  <p>${c.name.common}</p>
              </div>
          `;
      }).join('');
      document.getElementById('same_Region_Countries').innerHTML = `
          <h2>Countries in the Same Region (${region})</h2>
          <div class="country-list">${sameRegionCountriesList}</div>
      `;
  })
  .catch(function(error) {
      console.error('Error fetching data:', error);
      document.getElementById('country_Details').innerHTML
       = '<p>An error occurred: ' + error.message + '</p>';
      document.getElementById('same_Region_Countries').innerHTML = '';
  });
}