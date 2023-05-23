document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('musicButton').addEventListener('click', searchMusicManual)
  document.getElementById('musicForm').addEventListener('submit', searchMusicManual)
});

// Optional API arguments:
/* inc=aliases
%2Bartist-credits
%2Blabels
%2Bdiscids
%2Brecordings */

// Just in case we get throttled, here is a header to pass to the API.
const headers = new Headers({
  "Accept": "application/json",
  "Content-Type": "application/json",
  "User-Agent": "UChicagoDigitalStudies/1.0 (mcprosse@uchicago.edu)"
});

// This function will remove the previous results.
function removeResults(parentDiv) {
  while (parentDiv.firstChild) {
    parentDiv.removeChild(parentDiv.firstChild);
  }
};

function searchMusicManual() {
  // Clear out previous results and hide table each time the user searches
  removeResults(document.getElementById('output'));
  removeResults(document.getElementById('tableBody'));
  document.getElementById('artistName').innerText = "";
  document.getElementById('tableContainer').className = 'd-none';

  // Get Input
  var artistName = document.getElementById('artistInput').value;

  // Declare base url for API
  var urlArtist = "https://musicbrainz.org/ws/2/artist/?query=" + artistName + "&fmt=json";

  // Perform the fetch()
  fetch(urlArtist, {
    method: 'GET',
    headers: headers
  })
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('PROBLEM! Status code is: ' + response.status);
        return;
      };
      response.json().then(data => searchResults(data));
    });
  };


  function searchResults(data) {
    //console.log(data);
    let artists = data.artists;
    for (i in artists) {
      var newAnchor = document.createElement("a");
      // Cheat by invoking JS via anchor, pass artist ID and Name as parameters.
      newAnchor.href = `javascript:displayAlbums('${artists[i].id}', '${artists[i].name}')`;
      // Simple block display of links (as opposed to list)
      newAnchor.className = 'd-block'; //setAttribute('class', 'd-block');
      newAnchor.innerText = artists[i].name;
      document.getElementById("output").appendChild(newAnchor);
    }
  };

  // Create table of non-live albums by artist, link through to MB site.
  // This function queries 'release-group'. If that entity changes,
  // so much much of the rest of the function to account for the different JSON structure.
  // If we do not set &limit, the default is 25.
  function displayAlbums(id, artistName) {
    //console.log(`Artist json is: https://musicbrainz.org/ws/2/artist/${id}?inc=aliases&fmt=json`)
    var albumsURL = `https://musicbrainz.org/ws/2/release-group?artist=${id}&limit=150&fmt=json;`;
    console.log(`Albums by artist: ${albumsURL}`);
    document.getElementById('artistName').innerText = artistName;

    fetch(albumsURL)
    .then(
      function (response) {
        if (response.status !== 200) {
          console.log('PROBLEM! Status code is: ' + response.status);
          return;
        }
        response.json().then(data => getAlbums(data) );
      });
    };

    function getAlbums(data) {
      // We use bracket notation to access release-group because this is a non-standard entity name due to the dash.
      var releases = data["release-groups"];
      console.log(releases);
      // Prepare the page if the fetch is successful--remove artist list and reveal table
      removeResults(document.getElementById('output'));
      document.getElementById('tableContainer').className = 'd-block';

      // Iterate through the releases
      for (i in releases) {
        if (releases[i]["secondary-types"] != "Live" && releases[i]["primary-type"]=="Album") { // omit live albums
          console.log(releases[i])
          var releaseDate = releases[i]["first-release-date"];
          var albumTitle = releases[i]["title"];
          var newRow = document.createElement('tr'); // create a new row
          newRow.id = 'newRow_' + i // each row gets a unique ID
          document.getElementById('tableBody').appendChild(newRow) // append row to table
          var newReleaseData = document.createElement('td'); // new data cell for date
          newReleaseData.innerText = releaseDate; // add release date to cell
          document.getElementById('newRow_' + i).appendChild(newReleaseData); // append td to row
          var newTitleData = document.createElement('td'); // create data cell for album title
          newTitleData.id = 'newTD_' + i; // add ID to data cell so I can append anchor
          var newAnchor = document.createElement('a'); // create new anchor
          newAnchor.href = `https://musicbrainz.org/release-group/${releases[i].id}` // define href for anchor
          newAnchor.target = '_blank'; // make the link open in a new tab.
          newAnchor.innerText = albumTitle; // use album title for text node of anchor element.
          document.getElementById('newRow_' + i).appendChild(newTitleData); // append data cell to row
          document.getElementById('newTD_' + i).appendChild(newAnchor); // append anchor to data cell.
        }
      } //end of for
      sortTable();
    }

    // Generic table sort
    function sortTable() {
      var table, rows, switching, i, x, y, shouldSwitch;
      table = document.getElementById("tableOutput");
      switching = true;
      while (switching) {
        //switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
          shouldSwitch = false;
          x = rows[i].getElementsByTagName("TD")[0];
          y = rows[i + 1].getElementsByTagName("TD")[0];
          if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
            shouldSwitch = true;
            break;
          }
        }
        switching = false;
        if (shouldSwitch) {
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
        }
        //switching = false;
      }
    }