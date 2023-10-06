$(document).ready(function () {
    // Cuando se haga clic en el botón "Buscar"
    $("#btnBuscar").click(function () {
      // Obtén el término de búsqueda ingresado por el usuario
      var searchTerm = $("#inputBuscar").val().toLowerCase();
  
      // Realiza una solicitud AJAX para obtener el archivo JSON de películas
      $.getJSON("https://japceibal.github.io/japflix_api/movies-data.json", function (data) {
        // Filtra las películas que coinciden con el término de búsqueda
        var filteredMovies = data.filter(function (movie) {
          return movie.title.toLowerCase().includes(searchTerm);
        });
  
        // Limpia la lista actual de películas
        $("#lista").empty();
  
        // Agrega las películas filtradas a la lista
        filteredMovies.forEach(function (movie) {
          var listItem = '<li class="list-group-item">';
          listItem += '<h3 class="movie-title">' + movie.title + '</h3>';
          listItem += '<p>Tagline: ' + movie.tagline + '</p>';
          listItem += '<p>Calificación: ' + getStarRating(movie.vote_average) + '</p>';
          listItem += '</li>';
          $("#lista").append(listItem);
  
          // Agrega un evento de clic a los elementos de la lista de películas
          $(listItem).click(function () {
            // Actualiza el contenido del Offcanvas con la información de la película
            $("#movieTitle").text(movie.title);
            $("#movieOverview").text("Resumen: " + movie.overview);
            $("#movieGenres").text("Géneros: " + movie.genres.join(', '));
  
            // Muestra el Offcanvas al hacer clic en la película
            $("#movieDetailsOffcanvas").offcanvas('show');
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
    }
  });
  
  
  
   

  
  