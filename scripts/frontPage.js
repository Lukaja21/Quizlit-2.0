$(document).ready(function() {
  var flashcardJson = (function() {
    var flashcardJson = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "https://api.jsonbin.io/b/5e4b26d0817c5f163f9e781d/latest",
      'dataType': "json",
      'success': function (data) {
          flashcardJson = data;
      }
    });
    return flashcardJson;
  })();

  console.log(flashcardJson)

  var count = 0
  for (let [key, value] of Object.entries(flashcardJson)) {
    if (count == 6) {break;}
    if (flashcardJson[key][0] == "science") {var thumbnail = "images/science.jpg"}
    else if (flashcardJson[key][0] == "chinese") {var thumbnail = "images/chinese.jpg"}
    else if (flashcardJson[key][0] == "math") {var thumbnail = "images/math.jpg"}
    else if (flashcardJson[key][0] == "humanities") {var thumbnail = "images/humanities.jpg"}
    else {var thumbnail = "images/other.jpg"}
  
    $(".row").append(`
    <div class='col-lg-4 col-sm-6 mb-4'>
      <div class='card h-100'>
        <a href='sets/flashcard.html?name=${key}'><img class='card-img-top' src='${thumbnail}'></a>
        <div class='card-body'>
          <h4 class='card-title'><a href='sets/flashcard.html?name=${key}'>${key}</a></h4>
          <p class='card-text'>${flashcardJson[key][2]}</p>
        </div>
      </div>
    </div>`)
    count += 1
  }

})