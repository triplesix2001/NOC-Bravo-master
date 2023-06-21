let refreshIntervalId;

var currentNetworkGroups = 0;
var currentQscGroups = 0;

function fetchData() {
  $.ajax({
    url: "/api/data",
    success: function(data) {
      console.log(data); // check if the data is being fetched and returned correctly
      
      // Remove the existing groups
      $("#network-container").empty();
      $("#qsc-container").empty();
      
      // Update the DOM with the new data
      var networkHtml = "";
      for (var i = 0; i < data.network.length; i += 3) {
        $("#network-container").append('<div class="network-group"></div>');
        var groupIndex = i / 3;
        for (var j = i; j < Math.min(i + 3, data.network.length); j++) {
          $("#network-container .network-group:eq(" + groupIndex + ")").append(`
            <div class="network-card">
              <p id="ping">Ping ~ ${data.network[j].ping}ms</p>
              <h3>${data.network[j].gw_name}</h3>
              <p id="ispname">${data.network[j].ispname}</p>
              <div id="ap-imggroup">
              <img src="img/ap.png" id="ap-img"></img>
              </div>
              <div id="ap-info">
              <div id="activeap-group">
              <p id="totalaptext">  ${data.network[j].totalap}  </p>
              <img src="img/ok.png" class="person-img"></img>
              </div>
              <div id="disconnectedap-group">
              <p id="totalapdsctext">  ${data.network[j].totalapdsc}  </p>
              <img src="img/fail.png" class="person-img"></img>
              </div>
              </div>
              <div id="user-uptime">
              <div id="users">
              <p>${data.network[j].users}</p>
              <img src="img/person.png" class="person-img"></img>
              </div>
              </div>
              <p id="wanup">Uptime: ${data.network[j].wanup} days</p>
            </div>
          `);
        }
      }
      
      var qscHtml = "";
      for (var i = 0; i < data.qsc.length; i += 3) {
        $("#qsc-container").append('<div class="qsc-group"></div>');
        var groupIndex = i / 3;
        for (var j = i; j < Math.min(i + 3, data.qsc.length); j++) {
          $("#qsc-container .qsc-group:eq(" + groupIndex + ")").append(`
            <div class="qsc-card">
              <h3 id="core-name">${data.qsc[j].core_name}</h3>
              <p id="model">${data.qsc[j].model}</p>
              <div id="qscgroup">
              <div id="okqsc">
              <p>${data.qsc[j].OK}</p>
              <img src="img/ok.png" class="person-img"></img>
              </div>
              <div id="errorqsc">
              <p>${data.qsc[j].Fault}</p>
              <img src="img/fail.png" class="person-img"></img>
              </div>
              </div>
              <p id="qscuptime">Uptime: ${data.qsc[j].uptime} days</p>
              <p id="design">Running design: ${data.qsc[j].name}</p>
            </div>
          `);
        }
      }
      
      // Reset the interval to continue refreshing
      resetRefreshInterval();
    },
    error: function() {
      console.log("Error fetching data");
    }
  });
}

// Call the function initially to fetch the data
fetchData();

// Call the function every 30 seconds to update the data
refreshIntervalId = setInterval(fetchData, 30000);

// Reset the interval when the refresh script is called again
function resetRefreshInterval() {
  clearInterval(refreshIntervalId);
  refreshIntervalId = setInterval(fetchData, 30000);
}

// Calculate the total number of groups
const numNetworkGroups = document.querySelectorAll(".network-group").length;
const numQscGroups = document.querySelectorAll(".qsc-group").length;

// Calculate the width of a group, including margins and paddings
const networkGroupWidth = document.querySelector(".network-group").offsetWidth + 20;
const qscGroupWidth = document.querySelector(".qsc-group").offsetWidth + 20;

// Set the initial scroll position to 0
let networkScrollPos = 0;
let qscScrollPos = 0;

// Set the scroll increment to the width of a group
const scrollIncrement = networkGroupWidth;

// Define the scroll function
function scrollContainer() {
  // Update the scroll position
  networkScrollPos += scrollIncrement;
  qscScrollPos += scrollIncrement;

  // If the network scroll position exceeds the width of all groups,
  // reset it to the beginning
  if (networkScrollPos >= numNetworkGroups * networkGroupWidth) {
    networkScrollPos = 0;
  }

  // If the qsc scroll position exceeds the width of all groups,
  // reset it to the beginning
  if (qscScrollPos >= numQscGroups * qscGroupWidth) {
    qscScrollPos = 0;
  }

  // Apply the new scroll positions
  document.querySelector("#network-container").scrollTo(networkScrollPos, 0);
  document.querySelector("#qsc-container").scrollTo(qscScrollPos, 0);
}

// Set the scroll interval to 3 seconds
setInterval(scrollContainer, 10000);
