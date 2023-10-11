var filteredMovies; 
var selectedMovie;

$(document).ready(function () {
  // Cuando se haga clic en el botón "Buscar"
  $("#btnBuscar").click(function () {
    // Obtén el término de búsqueda ingresado por el usuario
    var searchTerm = $("#inputBuscar").val().toLowerCase();

    // Realiza una solicitud AJAX para obtener el archivo JSON de películas
    $.getJSON("https://japceibal.github.io/japflix_api/movies-data.json", function (data) {
      // Filtra las películas que coinciden con el término de búsqueda
      filteredMovies = data.filter(function (movie) {
        return movie.title.toLowerCase().includes(searchTerm);
      });

      // Limpia la lista actual de películas
      $("#lista").empty();

      // Agrega las películas filtradas a la lista
      filteredMovies.forEach(function (movie) {
        var listItem = '<div class="movie-item">';
        listItem += '<h3 class="movie-title" data-bs-toggle="modal" data-bs-target="#genreModal">' + movie.title + '</h3>';
        listItem += '<p class="movie-tagline">Tagline: ' + movie.tagline + '</p>';
        listItem += '<p class="movie-rating">Calificación: ' + getStarRating(movie.vote_average) + '</p>';
        listItem += '</div>';
        $("#lista").append(listItem);
      });
    });
  });
  });
  
    // Función para obtener una calificación con estrellas basada en un valor numérico
    function getStarRating(rating) {
      var stars = '';
      for (var i = 1; i <= 5; i++) {
        if (i <= rating / 2) {
          stars += '<i class="fa fa-star"></i>';
        } else {
          stars += '<i class="fa fa-star-o"></i>';
        }
      }
      return stars;
    };
  
  // Cuando se hace clic en el título de una película
  $(document).on('click', '.movie-title', function () {
    var movieTitle = $(this).text();
    var movie = filteredMovies.find(function (item) {
      return item.title === movieTitle;
    });

    // Inicializa una cadena para los géneros
    var genresString = "";
    
    // Recorre los tres primeros géneros y los concatena
    for (var i = 0; i < 3; i++) {
      if (movie.genres[i]) {
        genresString += movie.genres[i].name;
        if (i < 2) {
          genresString += ", ";
        }
      }
    }

    $("#genreDetailsModal").text(genresString);
  });
  $(document).on('click', '.movie-title', function () {
    var movieTitle = $(this).text();
    selectedMovie = filteredMovies.find(function (item) {
      return item.title === movieTitle;
    });

    // Actualiza el contenido de la lista desplegable "More" en el modal
    $("#genreDetailsMore").html(
      "Year: " + selectedMovie.release_date + "<br>" +
      "Runtime: " + selectedMovie.runtime + "<br>" +
      "Budget: " + selectedMovie.budget + "<br>" +
      "Revenue: " + selectedMovie.revenue
    );
  });












  
  
   

  
  