//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

// Percent with 2 decimal places
var toPercent = num => (Math.round(10000 * num) / 100).toFixed(2) + "%";

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;

var populationLayer = element.lookup["population-layer"];

populationLayer.eachLayer((tractLayer) => {
  const percentGrowth = toPercent(tractLayer.feature.properties.population_growth);
  tractLayer.bindPopup(`<b>Population growth:</b> ${percentGrowth}`);
});

map.scrollWheelZoom.disable();
