var xhr = require("./xhr");

var endpoint = "https://maps.googleapis.com/maps/api/geocode/json?address="

module.exports = {
  address: function(address, callback) {
    address = address.replace(/\s/g, '+');
    var bounds = "&bounds=46.708077,-123.005994|48.296752,-120.897556";
    xhr(endpoint + address + bounds, function(err, data) {
      if (err) return callback(err);
      if (data.status == "ZERO_RESULTS") {
        // invalid entry
        callback("No results");
      } else {
        try {
          var lat = data.results[0].geometry.location.lat;
          var lng = data.results[0].geometry.location.lng;
        } catch (err2) {
          callback("Unknown error");
          return;
        }
        callback(null, [lat, lng]);
      }
    });
  },
  gps: function(callback) {
    navigator.geolocation.getCurrentPosition(function(gps) {
      callback(null, [gps.coords.latitude, gps.coords.longitude]);
    }, err => callback(err));
  }
};
