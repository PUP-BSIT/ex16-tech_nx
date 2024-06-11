document.addEventListener("DOMContentLoaded", function () {
  fetchKpop();
});

function fetchKpop() {
  fetch("rest.php")
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      if (data.error) {
        console.error("API Error:", data.error);
        return;
      }
      let tableBody = document.querySelector("#kpop_table tbody");
      tableBody.innerHTML = "";
      data.forEach((kpop) => {
        let row = `<tr>
                  <td>${kpop.GroupName}</td>
                  <td>${kpop.Song}</td>
                  <td>${kpop.FandomName}</td>
                  <td>${kpop.DebutYear}</td>
                  <td>${kpop.Agency}</td>
                  <td>
                      <button onclick="deleteKpop(${kpop.id})">Delete</button>
                      <button onclick="editKpop(${kpop.id}, 
                        '${kpop.KpopGroup}', '${kpop.Song}', 
                        '${kpop.FandomName}', '${kpop.DebutYear}', 
                        '${kpop.Agency}')">Edit</button>
                  </td>
              </tr>`;
        tableBody.innerHTML += row;
      });
    })
    .catch((error) => console.error("Error fetching kpop:", error));
}

function insertKpop() {
  let GroupName = document.getElementById("GroupName").value;
  let Song = document.getElementById("Song").value;
  let FandomName = document.getElementById("FandomName").value;
  let DebutYear = document.getElementById("DebutYear").value;
  let Agency = document.getElementById("Agency").value;

  fetch("rest.php", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ GroupName, Song, FandomName, DebutYear, Agency }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Kpop Group added successfully");
        fetchKpop();
        clearForm();
      }
    })
    .catch((error) => console.error("Error adding kpop group:", error));
}

function deleteKpop(id) {
  fetch("rest.php", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message);
        fetchKpop();
      }
    })
    .catch((error) => console.error("Error deleting kpop:", error));
}

function editKpop(id, GroupName, Song, FandomName, DebutYear, Agency) {
  document.getElementById("GroupName").value = GroupName;
  document.getElementById("Song").value = Song;
  document.getElementById("FandomName").value = FandomName;
  document.getElementById("DebutYear").value = DebutYear;
  document.getElementById("Agency").value = Agency;
  document.getElementById("id").value = id;
  document.getElementById("add_btn").innerText = "Update Kpop Group";
  document.getElementById("add_btn").onclick = function () {
    updateKpop(id);
  };
}

function updateKpop(id) {
  let GroupName = document.getElementById("GroupName").value;
  let Song = document.getElementById("Song").value;
  let FandomName = document.getElementById("FandomName").value;
  let DebutYear = document.getElementById("DebutYear").value;
  let Agency = document.getElementById("Agency").value;

  fetch("rest.php", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      GroupName,
      Song,
      FandomName,
      DebutYear,
      Agency,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        alert("Error: " + data.error);
      } else {
        alert(data.message || "Kpop Group updated successfully");
        fetchKpop();
        clearForm();
      }
    })
    .catch((error) => console.error("Error updating Kpop:", error));
}

function clearForm() {
  document.getElementById("GroupName").value = "";
  document.getElementById("Song").value = "";
  document.getElementById("FandomName").value = "";
  document.getElementById("DebutYear").value = "";
  document.getElementById("Agency").value = "";
  document.getElementById("id").value = "";
  document.getElementById("add_btn").innerText = "Add Kpop Group";
  document.getElementById("add_btn").onclick = insertKpop;
}
