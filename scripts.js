// Base scripts - Top 9 Movie Loader
$(document).ready(function() {

const apiKey = '5d576382955ff5829fc3844390db4427';
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

$(function () {
    // After the DOM has loaded, call afterGoClicked after any time the button is clicked 
    // Button ID = #goButton
    $('button').click(afterGoClicked);
})

// Expand functionality ****************************************************
// * Add additional search criteria 
// * Automatically update the movie list whenever the user changes a value, so you don't need to use the 'Search' button

function afterGoClicked() {
  // Read the selected genre id from the select boxes and save it to a variable
  // Hint: use the JQuery .val() function on the element
  // Documentation: http://api.jquery.com/val/
  var genre = $('#genre').val();
  // Read the entered year from the text box and save it to a variable
  var year = $('#year').val();
  // Call buildQueryString to handle building a completeUrl and save it as a variable
  var completeUrl = buildQueryString(baseUrl, genre, year);
  // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function
  $.getJSON(completeUrl, afterDataLoaded); 
}

/* Combine the baseUrl, genre, and year together to create a complete url with the
  right query parameters. Then return the url.

  Check out examples query params at https://www.themoviedb.org/documentation/api/discover

  HINT: you will need to use with_genres in your query string
*/

function buildQueryString(baseUrl, genre, year){
    var queryString = baseUrl + '&with_genres=' + genre + '&primary_release_year=' + year;
    return queryString;
}

// Call this function with the data object that comes back from getJSON
function afterDataLoaded(dataObject){
    // All images have this base URL
    var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
    // Add link to movie official page
    var moviePageBaseUrl = "https://www.themoviedb.org/movie/"
  /* Loop over the results in the dataObject. 
    HINT: console log dataObject to find the name
    of the property that includes the array of results. 

    For each result (inside your loop):
    - Look up a corresponding img element (in order)
    - Set the img element's src tag to posterBaseUrl + the poster_path from the result movie
  */
    for (var i=0; i<dataObject.results.length; i++){
        $('#movieImg' + i).attr('src', posterBaseUrl + dataObject.results[i].poster_path);
        // Movie official Page
        $('#moviePage' + i).attr('href', moviePageBaseUrl + dataObject.results[i].id);
    }
}

});