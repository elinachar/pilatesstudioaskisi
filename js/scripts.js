$(document).ready(function(){

  // Smooth scrolling on single-page
  var $root = $('html, body');
  $('.navbar-nav li a, .navbar-header a, .logo a, .contact-link').click(function() {
    var href = $.attr(this, 'href');
    if (href != undefined && href != '#') {
      var offset = top_offset()
      $root.animate({
        scrollTop: $(href).offset().top - offset
      }, 500, function () {
        window.location.hash = href;
      });
    };
  });

  // Hover effect on Navbar
  $(".navbar-default .navbar-nav>li>a").hover(function(){
    var thisText = $(this).html();
    var hoverText = "&#8729;" + thisText.slice(6,-6) + "&#8729;";
    $(this).html(hoverText);
  }, function(){
    var thisText = $(this).html();
    thisText = thisText.replace(/^.(.*).$/m, '$1');
    var unhoverText = "&nbsp;" + thisText + "&nbsp;";
    $(this).html(unhoverText);
  });

  //Parallax effect
  // resize the image(s) on page load
  resize_all_parallax();

  // Disable parallax in touch devices
  touch_screen_disable_parallax();

  // Load Photos after page is loaded
  var photoImages= $('.img-for-modal');
  for (var i=0; i<photoImages.length; i++) {
    if ($(photoImages[i]).attr("data-src")) {
      $(photoImages[i]).attr("src", $(photoImages[i]).attr("data-src"))
    }
  };

  //Photos Modal
  var slideIndex = 1;

  // Open the Modal
  $(".img-for-modal").click(function() {
    $(".logo, .navbar").hide()
    $('#myModal').show()
    slideIndex = parseInt($(this).attr("data-slide"));
    showSlides(slideIndex);

  })

  // Close the Modal
  $(".modal .close").click(function() {
    $(".navbar").show();
    show_hide_logo() 
    $('#myModal').hide();
  })

  // Close Modal with Esc key
  $(document).keydown(function(event){
    if (event.keyCode == 27){
      $('#myModal').fadeOut(500);
      $(".logo, .navbar").show();
    };
  });

  // Next/previous controls
  $(".next").click(function() {
    showSlides(slideIndex += 1);
  })

  $(".prev").click(function() {
    showSlides(slideIndex -= 1);
  })

  function showSlides(n) {
    slideIndex = n
    var i;
    var slides = $(".mySlides");
    if (n > slides.length-1) {slideIndex = 0};
    if (n < 0) {slideIndex = slides.length - 1};
    for (i = 0; i < slides.length; i++) {
      $(slides[i]).hide();
    }
    $(slides[slideIndex]).show();
  }

});

// Function for navbar offset
function top_offset() {
  var offset = 50;
  var screenWidth = $(document).width();
  if (screenWidth >= 768) {
    var hLogo = $(".logo").height();
    var hNavbar = $(".navbar").height();
    offset = hLogo + hNavbar;
  };
  return offset
}

// Parallax effect
// resize the image(s) on page resize
$(window).on('resize', function(){
	resize_all_parallax();
});

// Parallax effect (https://inkplant.com/code/responsive-parallax-images)
// keep all of your resize function calls in one place so you don't have to edit them twice (on page load and resize)
function resize_all_parallax() {
  var lDivId = ['index-section', 'bkg-2', 'bkg-3']; /* the ID of the div that you're resizing */
  var lImgW = [1920, 1920, 1477]; /* the width of your image, in pixels */
  var lImgH = [1080, 1080, 831]; /* the height of your image, in pixels */

  for (i = 0; i < lDivId.length; i++) {
	  resize_parallax(lDivId[i], lImgW[i], lImgH[i]);
  };
}

// this resizes the parallax image down to an appropriate size for the viewport
function resize_parallax(divId, imgW, imgH) {
	var div = $('#' + divId);
	var divWidth = div.width();
	if (divWidth < 769) { var pct = (imgH/imgW) * 100; } /* show full image, plus a little padding, if on static mobile view */
	else { var pct = 60; } /* this is the HEIGHT as percentage of the current div WIDTH. you can change it to show more (or less) of your image */
	var newHeight = Math.round(divWidth * (pct/100));
	newHeight = newHeight  + 'px';
	div.height(newHeight);
}


// Function for disabling parallax in touch screens
function touch_screen_disable_parallax() {
  if (is_touch_device()) {
    var offset = top_offset();
    $(".parallax").css("background-attachment","inherit")
    $("#index-section").css("margin-top", offset-5);
  }
}

// Function for detecting touch device
function is_touch_device() {
  var prefixes = ' -webkit- -moz- -o- -ms- '.split(' ');
  var mq = function(query) {
    return window.matchMedia(query).matches;
  }

  if (('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch) {
    return true;
  }
  // include the 'heartz' as a way to have a non matching MQ to help terminate the join
  // https://git.io/vznFH
  var query = ['(', prefixes.join('touch-enabled),('), 'heartz', ')'].join('');
  return mq(query);
}

// Modal show/hide LOGO
$(window).on('resize', function(){
	show_hide_logo();
});

function show_hide_logo() {
  var screenWidth = $(document).width();
  if (screenWidth >= 769) {
    $(".logo").show();
  } else {
    $(".logo").hide();
  }
}

// API Google Map
function initMap() {
  // The location of position
  var pos = {lat: 35.3260216, lng: 25.1214555};
  // The map, centered at position
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: pos
  });
  // The marker, positioned at position
  var marker = new google.maps.Marker({position: pos, map: map});
};
