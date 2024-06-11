function submitSongs() {
    const title = document.querySelector("#title").value;
    const artist = document.querySelector("#artist").value;
    const genre = document.querySelector("#genre").value;
    const album = document.querySelector("#album").value;
    const duration = document.querySelector("#duration").value;

    fetch("./songs.php", {
      method: "POST",
      headers: {
        "Content-type": "x-www-form-urlencoded",
      },
      body: `title=${title}&artist=${artist}&genre=${genre}&album=${album}
      &duration=${duration}`,
    })
      .then((response) => response.text())
      .then((responseText) => {
        alert(responseText);
      });
}
    const table = document.querySelector("#songs_list");
    fetch("./select_data.php")
      .then((response) => response.json())
      .then((songsList) => {
        for (const songs of songsList) {
    const row = document.createElement("tr");
      row.innerHTML = `
    <td>${songs.id}</td>
    <td>${songs.title}</td>`;
      table.append(row);
    }
  });

  