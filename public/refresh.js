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
              <h3>${data.network[j].gw_name}</h3>
              <p>${data.network[j].line1}</p>
              <p>${data.network[j].line2}</p>
              <p>${data.network[j].line3}</p>
              <p>${data.network[j].line4}</p>
              <p>${data.network[j].line5}</p>
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
              <h3>${data.qsc[j].core_name}</h3>
              <p>${data.qsc[j].line1}</p>
              <p>${data.qsc[j].line2}</p>
              <p>${data.qsc[j].line3}</p>
              <p>${data.qsc[j].line4}</p>
              <p>${data.qsc[j].line5}</p>
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
