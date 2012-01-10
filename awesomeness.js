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

  // Hide all sections
  $("section").hide();

  // Show current section
  $("#" + args[0]).show();

  // If there are multiple arguments, handle them accordingly
  if(args[1]) {
    switch(args[0]) {
      case "home":
        // Do something?
        break;
      case "calculate":
        // Do something?
        break;
    }
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
  username = $("#username").text();
  tasteometer(username);
}

function tasteometer(username) {
  var req = new XMLHttpRequest();
  req.open("GET", "http://ws.audioscrobbler.com/2.0/?method=tasteometer.compare&type1=user&type2=user&value1=freddieboi&value2=" + username + "&api_key=ed8931c29ddfce1edb3414bf5866e99c", true);

  req.onreadystatechange = function() {

    console.log(req.status);

    if(req.readyState == 4) {
      if(req.status == 200) {
        console.log("Search complete!");
        console.log(req.responseText);
      }
    }
  };

  req.send();
}

$(function() {

  // Run on application load
  handleArgs();
  handleLinks();

  $("#share_button").click(function(e) {
    // Kung fu fighting URI
    var track_uri = "spotify:track:5t0Pxx2Yy3emqcla0EsINn";
    console.log("showSharePopup() for: " + track_uri);
    sp.social.showSharePopup(e.pageX, e.pageY, track_uri);
  });
});
