const _MS_PER_DAY = 1000 * 60 * 60 * 24;

function date_diff_indays (date1, date2) {
  dt1 = new Date(date1);
  dt2 = new Date(date2);
  return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

//More button functions
function more() {
	$(".pricing").show();
	$(".flashcardMore").attr("onclick", "less()")
	$(".flashcardMore").text("Less")
}

function less() {
	$(".pricing").hide();
	$(".flashcardMore").attr("onclick", "more()")
	$(".flashcardMore").text("More")
}

//Expand and shirnk functions
function ExpandBlock(block) {
  var func = "ShrinkBlock(" + "'" + block + "'" + ")"
  var block = ".block-" + block
  var button = block + "-button"
  $(".block-one").hide()
  $(".block-two").hide()
  $(".block-three").hide()
  $(block).show()
  $(block).removeClass("col-lg-4")
  $(block).addClass("col-lg-12")
  $(button).text("Shrink")
  $(button).attr("onclick",func)
}

function ShrinkBlock(block) {
  var func = "ExpandBlock(" + "'" + block + "'" + ")"
  var block = ".block-" + block
  var button = block + "-button"
  $(".block-one").show()
  $(".block-two").show()
  $(".block-three").show()
  $(block).addClass("col-lg-4")
  $(block).removeClass("col-lg-12")
  $(button).text("Expand")
  $(button).attr("onclick", func)
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

//Flashcard Functions
function flip() {
	$(".flashcard").css("color", "white")
	$(".flashcard").toggle("clip", {direction: "horizontal"})
	$(".flashcard").toggle("clip", {direction: "horizontal"})
	setTimeout(function (){
		if (side == 0) {
			++side
		} else {
			--side
		}
		$(".flashcardText").text(cards[card][side])
		setTimeout(function (){
			$(".flashcard").css("color", "black")
		}, 400)
	}, 400)
}

function right() {
	if (cards.length > card + 1) {
		$(".flashcard").css("color", "white")
		$(".flashcard").toggle("drop", {direction: "right"})
		$(".flashcard").toggle("drop", {direction: "left"})
		setTimeout(function (){
			++card
			side = 0
			$(".flashcardText").text(cards[card][side])
			setTimeout(function (){
				$(".flashcard").css("color", "black")
			}, 400)
		}, 400)
	}
}

function left() {
	if (card > 0) {
		$(".flashcard").css("color", "white")
		$(".flashcard").toggle("drop", {direction: "left"})
		$(".flashcard").toggle("drop", {direction: "right"})
		setTimeout(function (){
			--card
			side = 0
			$(".flashcardText").text(cards[card][side])
			setTimeout(function (){
				$(".flashcard").css("color", "black")
			}, 400)
		}, 400)
	}
}

//load page
$(document).ready(function() {
  $(".pricing").hide();
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

  var set = flashcardJson[getUrlVars()["name"].replace(/%20/g, " ")]

  //sidebar
  $(".info").text(set[2])

  testDate = new Date(set[4])
  currentDate = new Date()
  currentMonth = currentDate.getMonth() + 1
  currentDate = currentMonth.toString() + "/" + currentDate.getUTCDate().toString() + "/" + currentDate.getFullYear().toString()
  diffInDays = date_diff_indays(currentDate, testDate)
  if (diffInDays > 0) {
  	$(".testDate").text("Time until Test: " + diffInDays.toString())
  } else if (diffInDays == 0) {
  	$(".testDate").text("Time until Test: It's Today!")
  } else {
  	$(".testDate").text("Time until Test: Done!")
  }

  //More info
  $(".importantTexts").html(set[3][0])
  for (var i in set[1]) {
  	if (3 > set[1][i][0].split(' ').length) {
  		$(".vocab-words").append(`<li>
  		                            <span class="fa-li fa-xs">
  		                              <i class="fas fa-circle fa-xs"></i>
  		                            </span>${set[1][i][0]} - ${set[1][i][1]}
  		                          </li>`)
  	}
  }
  for (var i in set[3][1]) {
  	$(".tips").append(`<li>
  	                     <span class="fa-li fa-xs">
  	                       <i class="fas fa-circle fa-xs"></i>
  	                     </span>${set[3][1][i]}
  	                   </li>`)
  }

  //load flashcards
  cards = set[1]
  card = 0
  side = 0
  console.log(cards)
  $(".flashcardText").text(cards[card][side])

 });