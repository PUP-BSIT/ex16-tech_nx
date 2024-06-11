function countrySearch() {
    const countryName = document.getElementById('country_input').value;
    if (!countryName) {
        alert('Please enter a country name.');
        return;
    }
    
    fetch('https://restcountries.com/v3.1/name/' + countryName)
    .then(function(response) {
      if (!response.ok) {
        throw new Error('Country not found');
      }
      return response.text();
      })
    .then(function(countryData) {
    let country = JSON.parse(countryData)[0];
    let details = `
     <h2>${country.name.common}</h2>
     Population: ${country.population.toLocaleString()}
     <p>Area: ${country.area ? country.area.toLocaleString() 
                               + ' square kilometers' : 'N/A'}</p>
     <p>Languages: ${country.languages ? Object.
                          values(country.languages).join(', ') : 'N/A'}</p>
     <p>Capital: ${country.capital ? 
            country.capital[0] : 'N/A'}</p>
     <p>Timezones: ${country.timezones ? 
                          country.timezones.join(', ') : 'N/A'}</p>
     <p>Region: ${country.region ? 
                            country.region : 'N/A'}</p>
    `;
    document.getElementById('country_details').innerHTML = details;
    
    return fetch('https://restcountries.com/v3.1/region/' + country.region);
    })
    .then(function(response) {
      if (!response.ok) {
       throw new Error('Region not found');
      }
      return response.text();
      })
    .then(function(regionData) {
    let region = JSON.parse(regionData)[0].region;
    let sameRegionCountriesList = JSON.parse(regionData).map(function(c) {
     return `
     <div class="country-card">
         <img src="${c.flags.svg}" alt="Flag of ${c.name.common}" width="50">
         <p>${c.name.common}</p>
     </div>
     `;
    }).join('');
    document.getElementById('same_region_countries').innerHTML = `
     <h2>Countries in the Same Region (${region})</h2>
     <div class="country-list">${sameRegionCountriesList}</div>
    `;
    })
    .catch(function(error) {
    console.error('Error fetching data:', error);
    document.getElementById('country_details').innerHTML = '<p>An error occurred: '
              + error.message + '</p>';
    document.getElementById('same_region_countries').innerHTML = '';
    });
  }