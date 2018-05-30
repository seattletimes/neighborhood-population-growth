//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

// Percent with 1 decimal place
var formatPercent = num => `${num.toFixed(1)}%`;

// Doesn't work on 1 million+
var formatWithComma = function addComma(n) {
  var str = String(n);
  if (str.length <= 3) return str;
  return `${str.slice(0, -3)},${str.slice(-3)}`;
};

//get access to geojson layer
var element = document.querySelector("leaflet-map");
var populationLayer = element.lookup["population-layer"];

populationLayer.eachLayer((tractLayer) => {
  var { populationGrowthPercent, populationGrowthCount, tractNum } = tractLayer.feature.properties;
  var formattedGrowth = formatPercent(populationGrowthPercent);
  var formattedCount = formatWithComma(populationGrowthCount);
  tractLayer.bindPopup(`<h1 class="bigheader">Census tract ${tractNum}</h1>
<b>Population growth:</b> ${formattedGrowth} (+${formattedCount} people)`);
});

map.scrollWheelZoom.disable();
