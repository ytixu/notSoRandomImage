function drawArrow(){
	var c = document.getElementById("canvas");
	c.width = 55;
	c.height = 63;
	var ctx = c.getContext("2d");
	ctx.strokeStyle = '#ffffff';
	ctx.lineWidth = 5;
	ctx.moveTo(5,5);
	ctx.lineTo(27,29);
	ctx.lineTo(50,5);
	ctx.stroke();
	ctx.moveTo(5,29);
	ctx.lineTo(27,52);
	ctx.lineTo(50,29);
	ctx.lineWidth = 8;
	ctx.stroke();
	$("#canvas").hide();
}

var scheduledScrollerAnimation = null;

function scheduleScollAnimation(){
	scheduledScrollerAnimation = setTimeout(function(){
		$("#canvas").fadeIn("slow");
		$("#canvas").animate({bottom: "-=29px"}, 500, function(){
				$("#canvas").animate({bottom: "+=29px"}, 500);
			});
	}, 1000);
}

window.onload = function(){
	drawArrow();
	scheduleScollAnimation();
}