var close = true

function open() {
	$(".feedInfo").slideToggle(750);
	if (close) {
		$(".expandFeed").addClass("moreFeed")
		$(".feedText").css("color", "white")
		close = false
	} else {
		$(".expandFeed").removeClass("moreFeed")
		$(".feedText").css("color", "grey")
		close = true
	}
}