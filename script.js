function drawArrow(){
	var c = document.getElementById("canvas");
	c.width = 55;
	c.height = 83;
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
	$("#scroll").hide();
}

function scheduleScrollAnimation(){
	$("#scroll").animate({bottom: "-=20px"}, 500, function(){
		$("#scroll").animate({bottom: "+=20px"}, 500, function(){
			$("#scroll").animate({bottom: "-=20px"}, 500, function(){
				$("#scroll").animate({bottom: "+=20px"}, 500, function(){
					setTimeout(function(){ scheduleScrollAnimation();
					}, 3000);
				});
			});
		});
	});	
}


function nextImage(){
	$.getJSON("http://www.reddit.com/r/foodporn/.json?jsonp=?", function(data) { 
    	$.each(data.data.children, function(i,item){
        	$("<img/>").attr("src", item.data.url).appendTo("#images");
    	});
	});

}



window.onload = function(){
	drawArrow();
	setTimeout(function(){
		$("#scroll").fadeIn("slow", function(){
			scheduleScrollAnimation();
		});
	}, 3000);
	// bind scroll
	window.addEventListener ("mousewheel", function (event) {
		nextImage();
	});
}