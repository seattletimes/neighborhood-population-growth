//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

// Percent with 1 decimal place
var formatPercent = num => `${num.toFixed(1)}%`;

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var populationLayer = element.lookup["population-layer"];

populationLayer.eachLayer((tractLayer) => {
  var { populationGrowthPercent, tractNum } = tractLayer.feature.properties;
  var formattedGrowth = formatPercent(populationGrowthPercent);
  tractLayer.bindPopup(`<h1 class="bigheader">Census tract ${tractNum}</h1> <b>Population growth:</b> ${formattedGrowth}`);
});

map.scrollWheelZoom.disable();
