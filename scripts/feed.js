var close = true

function openFeed(index) {
	var feedInfo = $(".feedInfo" + index)
	var expandFeed = $(".expandFeed" + index)

	feedInfo.slideToggle(750);
	if (close) {
		expandFeed.addClass("moreFeed")
		close = false
		setTimeout(function (){

		  expandFeed.removeClass("moreFeed")
		  expandFeed.addClass("turnedFeed")

		}, 750);
	} else {
		expandFeed.addClass("lessFeed")
		close = true
		setTimeout(function (){

		  expandFeed.removeClass("lessFeed")
		  expandFeed.removeClass("turnedFeed")

		}, 275);
	}
}

$(document).ready(function() {
  var feedJson = (function() {
    var feedJson = null;
    $.ajax({
      'async': false,
      'global': false,
      'url': "https://api.jsonbin.io/b/5e4b26a69c65d21641ada25e/latest",
      'dataType': "json",
      'success': function (data) {
          feedJson = data;
      }
    });
    return feedJson;
  })();

  console.log(feedJson)

  var count = 0
  for (let [key, value] of Object.entries(feedJson)) {
  	console.log(count)
  	var box = feedJson[key]
  	if (box[3] == "science") {var thumbnail = "../images/science.jpg"}
  	else if (box[3] == "chinese") {var thumbnail = "../images/chinese.jpg"}
  	else if (box[3] == "math") {var thumbnail = "../images/math.jpg"}
  	else if (box[3] == "humanities") {var thumbnail = "../images/humanities.jpg"}
  	else {var thumbnail = "../images/other.jpg"}

  	$(".container").append(`<div class="feedBox">
        						<div class="thumbnailCrop">
        						  	<img class="feedThumbnail" src=${thumbnail}>
        						</div>
        						<div class="feedTitle">${box[1]}</div>
        						<div class="feedDate">Posted: ${box[0]}</div>
        						<i class="fas fa-caret-right fa-2x expandFeed expandFeed${count}" onclick="openFeed(${count});"></i>
        						<div class="feedText">Subject: ${box[3].charAt(0).toUpperCase() + box[3].slice(1)}</div>
      						</div>`)
  	$(".container").append(`<div class="feedInfo feedInfo${count}">
  								<div class="feedInfoText">
  									${box[2]}
  								</div>
  							</div>`)
  	++count
  }
});