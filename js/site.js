// TODO: Use a function closure and release global $
$(document).ready(function() {
  $('#gh-form').on('submit', function(event) {
    // get the value of the string entered by user into variable called "place"
    var place = document.getElementById('gh-location').value;

    //get the geocoded value of place and use it to make a map with initMap function
    var geocoder = new google.maps.Geocoder();

    event.preventDefault();

    //this checks to see if a previous country's information is already displayed.
    //if some information is displayed, it clears it out the element for the next search
      $('#primary').empty();

    geocoder.geocode({
      'address': place
    }, function(results, status) {
      initMap(results);
    });
    countryInfo(place);
  });

  //function to clear form.
  function clearForm() {
    document.getElementById('gh-form').reset();
  }

  //get country information from RESTcountries API.
  function countryInfo(location) {
    $.get(
          'https://restcountries.eu/rest/v1/name/' + location,
          function(data) {
            var c = data[0];

            var list = '<ul id="country-details">' +
                  '<li class="info-label" id="country-name">Country</li>' +
                  '<li class="info">' + c.name + '</li>' +
                  '<li class="info-label" id="country-capital">Capital</li>' +
                  '<li class="info">' + c.capital + '</li>' +
                  '<li class="info-label" id="two-letter-country-code">Two-letter country code</li>' +
                  '<li class="info">' + c.alpha2Code + '</li>' +
                  '<li class="info-label" id="three-letter-country-code">Three-letter country code</li>' +
                  '<li class="info">' + c.alpha3Code + '</li>' +
                  '<li class="info-label" id="calling-code">Calling code</li>' +
                  '<li class="info">' + c.callingCodes[0] + '</li>' +
                  '<li class="info-label" id="country-region">Region</li>' +
                  '<li class="info">' + c.region + '</li>' +
                  '<li class="info-label" id="subregion">Subregion</li>' +
                  '<li class="info">' + c.subregion + '</li>' +
                  '</ul>';

            $('#primary').append(list);
          });
    event.preventDefault();
  }

  function initMap(place) {

      // place to lat, long object

    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 5,
      center: place[0].geometry.location
    });

    var marker = new google.maps.Marker({
      position: place[0].geometry.location,
      map: map
    });

    //clear form fields when this function is called.
    clearForm();
  }
});
