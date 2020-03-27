$('#search-form').on('submit', function () {
  var term = $("#search-input").val()
  var url = 'https://quizlit.me/sets/flashcard.html?term=' + term
  window.location = 'https://quizlit.me/sets/flashcard.html?term=' + $("#search-input").val()
}