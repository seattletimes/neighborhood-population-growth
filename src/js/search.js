var pip = require("@mapbox/leaflet-pip/leaflet-pip.min");
pip.bassackwards = true; // Accept [lat, lng] instead of [lng, lat]

var $ = require("./lib/qsa");
var geolocation = require("./lib/geolocation");

//get access to geojson layer
var element = $.one("leaflet-map");
var L = element.leaflet;
var map = element.map;
var populationLayer = element.lookup["population-layer"];

// Search - see https://github.com/seattletimes/cascadia-data/blob/master/src/js/map.js
var searchBox = $.one(".location-search input");
var searchButton = $.one(".location-search button");
var hereMarker = L.marker([], {
  icon: L.divIcon({
    iconSize: [10, 10],
    className: "here-marker",
  }),
});

var search = function search() {
  // If nothing in search box, do nothing
  if (searchBox.value === "") return;

  // Prevent user from initiating multiple searches at once
  searchButton.innerHTML = "Loading ...";
  searchButton.setAttribute("disabled", "");
  searchBox.setAttribute("disabled", "");

  // Geocode
  geolocation.address(searchBox.value, (err, coords) => {
    if (err) { // Nothing found, out of bounds, XHR error (rate limited?)
      searchButton.innerHTML = "Error, try again";
    } else {
      // Place marker at location and pan map there
      hereMarker.setLatLng(coords);
      map.hasLayer(hereMarker) || hereMarker.addTo(map);
      map.setView(coords, 12);

      // Try to identify census tract (it's possible we are out of scope - e.g. Olympia)
      var tract = pip.pointInLayer(coords, populationLayer, true)[0];
      if (tract) tract.openPopup(coords);

      // On success, set button back to original text
      searchButton.innerHTML = "Find your census tract";
    }

    // Always re-enable button and input
    searchButton.removeAttribute("disabled");
    searchBox.removeAttribute("disabled");
  });
};

// Listen for enter in search box + click (and enter and spacebar) on button
searchBox.addEventListener("keydown", (ev) => {
  if (ev.keyCode === 13) search();
});
searchButton.addEventListener("click", search);

// ALlows us to disable button when search box is empty
searchBox.addEventListener("input", () => {
  if (searchBox.value === "") searchButton.setAttribute("disabled", "");
  else searchButton.removeAttribute("disabled");
});
