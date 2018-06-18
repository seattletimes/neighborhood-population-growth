//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

// Percent with 1 decimal place
var formatPercent = num => `${num.toFixed(1)}%`;

// Doesn't work on 1 million+
var formatWithComma = function addComma(n) {
  if (n < 0) return `-${formatWithComma(-n)}`; // so lazy
  var str = String(n);
  if (str.length <= 3) return str;
  return `${str.slice(0, -3)},${str.slice(-3)}`;
};

//get access to geojson layer
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;
var populationLayer = element.lookup["population-layer"];

// Bind popups
populationLayer.eachLayer((tractLayer) => {
  var { populationGrowthPercent, populationGrowthCount, tractNum } = tractLayer.feature.properties;
  var formattedGrowth = formatPercent(populationGrowthPercent);
  var formattedCount = formatWithComma(populationGrowthCount);
  tractLayer.bindPopup(`<h1 class="bigheader">Census tract ${tractNum}</h1>
<b>Population change:</b> ${formattedGrowth} (${formattedCount > 0 ? '+' : ''}${formattedCount} people)`);
});

map.scrollWheelZoom.disable();

// Add city/neighborhood labels above tracts
var topLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
  opacity: 0.8,
  pane: "markerPane",
}).addTo(map);

require("./search.js");
