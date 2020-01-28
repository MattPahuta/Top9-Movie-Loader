// Base scripts - Top 9 Movie Loader

const apiKey = '5d576382955ff5829fc3844390db4427';
const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&sort_by=popularity.desc`;

$(function () {
    // After the DOM has loaded, call afterGoClicked after any time the button is clicked 
    $('#searchButton').click(afterGoClicked);
});

// Now playing Search
$(function () {
  // After the DOM has loaded, call afterGoClicked after any time the button is clicked 
  $('#nowPlaying').click(nowPlaying);
});

// Expand functionality ****************************************************
// * Add additional search criteria 
//    - Search for what's playing now
// * Automatically update the movie list whenever the user changes a value, so you don't need to use the 'Search' button

function afterGoClicked() {
  // Read the selected genre id from the select boxes and save it to a variable
  var genre = $('#genre').val();
  // Read the entered year from the text box and save it to a variable
  var year = $('#year').val();
  // Call buildQueryString to handle building a completeUrl and save it as a variable
  var completeUrl = buildQueryString(baseUrl, genre, year);
  // Load the JSON from the API with completeUrl, and then call the afterDataLoaded function
  console.log('completeUrl: ' + completeUrl)
  $.getJSON(completeUrl, afterDataLoaded); 
}

// Search now playing
function nowPlaying(){
  // var nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&language=en-US&page=1';
  var nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing?api_key=5d576382955ff5829fc3844390db4427&language=en-US&page=1&region=US';
  $.getJSON(nowPlayingUrl, afterDataLoaded)
}


function buildQueryString(baseUrl, genre, year){
    var queryString = baseUrl + '&with_genres=' + genre + '&primary_release_year=' + year;
    console.log('queryString: ' + queryString)
    return queryString;
}

// Call this function with the data object that comes back from getJSON
function afterDataLoaded(dataObject){
    // All images have this base URL
    var posterBaseUrl = "https://image.tmdb.org/t/p/w500"
    // Add link to movie official page
    var moviePageBaseUrl = "https://www.themoviedb.org/movie/"

    for (var i=0; i<dataObject.results.length; i++){
      console.log(dataObject.results[i])
      $('#movieImg' + i).attr('src', posterBaseUrl + dataObject.results[i].poster_path);
      $('#moviePage' + i).attr('href', moviePageBaseUrl + dataObject.results[i].id);
    }
}

  // Reset sections button
  $('#resetButton').click(function() {
    location.reload(true);
  });
