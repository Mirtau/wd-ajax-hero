(function() {
  'use strict';

  const movies = [];

  const renderMovies = function() {
    $('#listings').empty();
    $('.material-tooltip').remove();
    for (const movie of movies) {
      const $col = $('<div>').addClass('col s6');
      const $card = $('<div>').addClass('card hoverable');
      const $content = $('<div>').addClass('card-content center');
      const $title = $('<h6>').addClass('card-title truncate');

      $title.attr({
        'data-position': 'top',
        'data-tooltip': movie.title
      });

      $title.tooltip({
        delay: 50
      }).text(movie.title);

      const $poster = $('<img>').addClass('poster');

      $poster.attr({
        src: movie.poster,
        alt: `${movie.poster} Poster`
      });

      $content.append($title, $poster);
      $card.append($content);

      const $action = $('<div>').addClass('card-action center');
      const $plot = $('<a>');

      $plot.addClass('waves-effect waves-light btn modal-trigger');
      $plot.attr('href', `#${movie.id}`);
      $plot.text('Plot Synopsis');

      $action.append($plot);
      $card.append($action);

      const $modal = $('<div>').addClass('modal').attr('id', movie.id);
      const $modalContent = $('<div>').addClass('modal-content');
      const $modalHeader = $('<h4>').text(movie.title);
      const $movieYear = $('<h6>').text(`Released in ${movie.year}`);
      const $modalText = $('<p>').text(movie.plot);

      $modalContent.append($modalHeader, $movieYear, $modalText);
      $modal.append($modalContent);

      $col.append($card, $modal);

      $('#listings').append($col);

      $('.modal-trigger').leanModal();
    }
  };
  $('button').on('click',  function(hw) {
    movies.splice(0)
    let input = $('#search').val();
    $('#search').val('');
    hw.preventDefault();
    console.log(input);
    if (input === '') {
      alert("enter movie title")
    }
    let xhr = $.getJSON('https://omdb-api.now.sh/?s=' + input);

    xhr.done(function(movie) {
      if (xhr.status !== 200) {
        return;
      }


       var results = movie.Search;
      function Movie(Title, Year, Poster, imdbID) {
        this.movie = Title;
        this.poster = Poster;
        this.year = Year
        this.id = imdbID;
      }

      for (var i = 0; i < results.length; i++) {
        movies.push(new Movie(results[i].Title, results[i].Year, results[i].Poster, results[i].imdbID))
      }
      renderMovies()

    })

  })

})();
