document.addEventListener("DOMContentLoaded", function () {
  let comments = [];

  function addComment(event) {
    event.preventDefault();
    console.log("Add comment");
    let name = document.querySelector("#fname").value;
    let commentText = document.querySelector("#comment").value;
    let date = new Date().toLocaleDateString();

    let comment = { name, comment: commentText, date };

    comments.push(comment);
    sortComments();
    displayComments();

    document.querySelector("#fname").value = "";
    document.querySelector("#comment").value = "";
    document.querySelector("#com-b").disabled = true;
  }

  function displayComments() {
    let commentList = document.querySelector("#comments_section");
    commentList.innerHTML = "";

    comments.forEach((comment) => {
      let li = document.createElement("li");
      li.textContent = `${comment.comment} - ${comment.name} 
          - ${comment.date}`;
      commentList.appendChild(li);
    });
  }

  function sortComments(order = "asc") {
    if (order === "asc") {
      comments.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === "desc") {
      comments.sort((a, b) => b.name.localeCompare(a.name));
    }
  }

  function comment_btn() {
    let name = document.getElementById("fname").value;
    let comment = document.getElementById("comment").value;
    let button = document.getElementById("com-b");

    button.disabled = !(name.length && comment.length);
  }

  document
    .querySelector("#comments_form")
    .addEventListener("submit", addComment);
  document.querySelector("#fname").addEventListener("input", comment_btn);
  document.querySelector("#comment").addEventListener("input", comment_btn);
  document.querySelector("#asc_btn").addEventListener("click", function () {
    sortComments("asc");
    displayComments();
  });
  document.querySelector("#desc_btn").addEventListener("click", function () {
    sortComments("desc");
    displayComments();
  });

  displayComments();
});

function searchCountry() {
    let countryName = document.getElementById("countryInput").value.trim();
    if (!countryName) {
      document.getElementById("countryDetails").innerHTML =
        "<p>Please enter a country name.</p>";
      document.getElementById("sameRegionCountries").innerHTML = "";
      return;
    }
  
    fetch("https://restcountries.com/v3.1/name/" + countryName)
      .then(function (response) {
        if (!response.ok) {
          throw new Error("Country not found");
        }
        return response.text();
      })
      .then(function (countryData) {
        let country = JSON.parse(countryData)[0];
        let details = `<h2>Country Details - ${country.name.common}</h2>
          <img src="${country.flags.svg}" alt="Flag of
             ${country.name.common}" width="100">

          <p><strong>Area:</strong> 
            ${country.area ? country.area.toLocaleString() + 
              " square kilometers" : "N/A"}
          </p>

          <p><strong>Languages:</strong> 
            ${country.languages ? Object.values(country.languages)
                .join(", ") : "N/A"}
          </p>

          <p><strong>Subregion:</strong> ${country.subregion ? 
            country.subregion : "N/A"}
          </p>

          <p><strong>Capital:</strong>
            ${country.capital ? country.capital[0] : "N/A"}
          </p>

          <p><strong>Timezones:</strong> 
            ${country.timezones ? country.timezones.join(", ") : "N/A"}
          </p>
        `;
  
        document.getElementById("countryDetails").innerHTML = details;
  
        return fetch("https://restcountries.com/v3.1/region/" + country.region)
          .then(function (response) {
            if (!response.ok) {
              throw new Error("Region not found");
            }
            return response.text();
          })
          .then(function (regionData) {
            let region = JSON.parse(regionData)[0].region;
            let sameRegionCountriesList = "";
  
            for (let c of JSON.parse(regionData)) {
              sameRegionCountriesList += `
                <div class="country-card">
                  <img src="${c.flags.svg}" alt="Flag of ${c.name.common}
                           " width="50">
                  <p>${c.name.common}</p>
                </div>
              `;
            }
  
            document.getElementById("sameRegionCountries").innerHTML = `
              <h2>Countries in the Same Region (${region})</h2>
              <div class="country-list">${sameRegionCountriesList}</div>
            `;
          })
          .catch(function (error) {
            console.error("Error fetching data:", error);
            document.getElementById("countryDetails").innerHTML = 
                    "<p>An error occurred: " + error.message + "</p>";
            document.getElementById("sameRegionCountries").innerHTML = "";
          });
      });
  }
  