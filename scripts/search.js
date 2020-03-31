$(document).ready(function() {
  $("#searchUL").show();
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

  for (let [key, value] of Object.entries(flashcardJson)) {
    if (flashcardJson[key][0] == "science") {var thumbnail = "../images/science.jpg"}
    else if (flashcardJson[key][0] == "chinese") {var thumbnail = "../images/chinese.jpg"}
    else if (flashcardJson[key][0] == "math") {var thumbnail = "../images/math.jpg"}
    else if (flashcardJson[key][0] == "humanities") {var thumbnail = "../images/humanities.jpg"}
    else {var thumbnail = "../images/other.jpg"}
    $("#searchUL").append(`<li subject=${flashcardJson[key][0]}><a href='../sets/flashcard.html?name=${key}'><img src='${thumbnail}' class='searchThumnail'>${key}</a></li>`)
  }

});

function changeSubject(subject) {
  $("#dropdownMenuButton").attr("value", subject)
  $("#dropdownMenuButton").text(subject.charAt(0).toUpperCase() + subject.slice(1))
}

function hideSearch() {
  if ($("#searchInput").is(":focus")) {
    $("#searchUL").show();
    myFunction()
  } else {
    $("#searchUL").hide();
  }
}

function myFunction() {
  var subject = $("#dropdownMenuButton").attr("value")

  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('searchInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("searchUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      if ($(li[i]).attr("subject") == subject || subject == "all") {
        $(li[i]).show();
      } else {
        $(li[i]).hide();
      }
    } else {
      $(li[i]).hide();
    }
  }
}