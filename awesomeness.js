console.log("Loading awesomeness.js");

// Initialize the Spotify objects
var sp = getSpotifyApi(1);
var m = sp.require("sp://import/scripts/api/models");
var v = sp.require("sp://import/scripts/api/views");

// Leave these uncommented for fast access to the API calls
console.log(sp.core);
console.log(sp.trackPlayer);
console.log(sp.social);

// Handle URI arguments
sp.core.addEventListener("argumentsChanged", handleArgs);
function handleArgs() {
  // Get all the arguments
  var args = sp.core.getArguments();
  
  // Already visible?
  var tab = $("#" + args[0]);
  if (tab.is(':visible')) {
    return;
  }
  
  // Hide all sections
  $("section").hide();
  
  // Show current section
  tab.show();

  switch(args[0]) {
    case "home":
      $("#result").hide();
      $("#calculate").click(function() {
        calculate();
      });
      if(args[1]) {
        // If there are multiple arguments, handle them accordingly
      }
      break;
    case "about":
      if(args[1]) {
        // If there are multiple arguments, handle them accordingly
      }
      break;
  }
}

// Handle Drag 'n' Drop
sp.core.addEventListener("linksChanged", handleLinks);
function handleLinks() {
  // Get the incoming links
  var links = sp.core.getLinks();

  if(links.length) {
    // Play the given item
    sp.trackPlayer.playTrackFromUri(links[0], {
      onSuccess : function() {
      }
    });
  }
}

// Go to the specified tab (location)
function goTo(location) {
  window.location = location
}

function calculate() {
  $("#message").text("Calculating...");
  $("#result").hide();
  var username = $("#username").val();
  var query = "http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&format=json&type1=user&type2=user&value1=freddieboi&value2=" + username + "&api_key=ed8931c29ddfce1edb3414bf5866e99c"
  $.get(query)
    .done(function(data) {
      if (data.error) {
        $("#message").text("Failed to get awesomeness ("+data.error+": "+data.message+")");
      }
      var percentage = data.comparison.result.score*100;
      $("#result_percentage").text(percentage.toFixed(0)+"%");
      $("#message").text("Done");
      $("#result").fadeIn("slow");
    })
    .fail(function (data) {
      $("#message").text("Failed to get awesomeness ("+data.status+": "+data.responseText+")");
    });
}

$(function() {

  // Run on application load
  handleArgs();
});
