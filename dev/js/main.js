function reScale(){
	var scale = $(window).innerWidth() / 1920;
	$(".scaleable-wrapper__inner").css({
		transform: "scale(" + scale + ")"
	});
}

$(document).ready(function () {
	reScale();
	$(window).on('resizeend', 1, function() {
		reScale();
	});
	$('.toggle-menu').click(function(event) {
		event.preventDefault();
		$(this).toggleClass('active');
		$('.main-nav').toggleClass('visible');
	});
	var header = $(".site-header");
	$(window).scroll(function() {
		var scroll = $(window).scrollTop();
		if (scroll >= 140) {
			header.addClass("dark__header");
		} else {
			header.removeClass("dark__header");
		}
	});
	$('.tastes__input').iLightInputNumber({
		mobile: false
	});

	var myVideo = document.getElementById("video_p");
	if(myVideo) {
			$(".play__video").addClass("active_btn");
	    function playPause() {
	        if (myVideo.paused){
	            myVideo.play();
	            $(".play__video").addClass("active_btn");
	        } else {
	            myVideo.pause();
	            $(".play__video").removeClass("active_btn");
	        }
	    }
	    myVideo.onended = function() {
	    	$(".play__video").removeClass("active_btn op_btn");
		};
	    $(".play__video").on('click', function(){
	        $(this).toggleClass("op_btn");
	        playPause();
	        return false
	    });
	}
    

    
});