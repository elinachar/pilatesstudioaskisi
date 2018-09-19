$(document).ready(function(){

  // Smooth scrolling on single-page
  var $root = $('html, body');
  $('.navbar-nav a, .navbar-header a, .logo a, .contact-link').click(function() {
    var href = $.attr(this, 'href');
    if (href != undefined && href != '#') {
      var hLogo, hNavbar, hSocial, offset
      offset = 50
      hLogo = $(".logo").height();
      hNavbar = $(".navbar").height();
      if (hNavbar < 50) {
        offset = hLogo + hNavbar;
      };
      $root.animate({
        scrollTop: $(href).offset().top - offset
      }, 500, function () {
        window.location.hash = href;
      });
    }
    return false;
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
    $(".logo, .navbar").show()
    $('#myModal').hide()
  })
  // Close Modal with Esc key
  $(document).keydown(function(event){
    console.log("esc")
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

// Parallax effect
// resize the image(s) on page resize
$(window).on('resize', function(){
	resize_all_parallax();
});

// Parallax effect (https://inkplant.com/code/responsive-parallax-images)
// keep all of your resize function calls in one place so you don't have to edit them twice (on page load and resize)
function resize_all_parallax() {
  var lDivId = ['bkg-1', 'bkg-2', 'bkg-3']; /* the ID of the div that you're resizing */
  var lImgW = [1920, 1920, 1477]; /* the width of your image, in pixels */
  var lImgH = [1080, 1080, 831]; /* the height of your image, in pixels */

  for (i = 0; i < lDivId.length; i++) {
	  resize_parallax(lDivId[i], lImgW[i], lImgH[i]);
  };
}

/* this resizes the parallax image down to an appropriate size for the viewport */
function resize_parallax(divId, imgW, imgH) {
	var div = $('#' + divId);
	var divWidth = div.width();
	if (divWidth < 769) { var pct = (imgH/imgW) * 100; } /* show full image, plus a little padding, if on static mobile view */
	else { var pct = 60; } /* this is the HEIGHT as percentage of the current div WIDTH. you can change it to show more (or less) of your image */
	var newHeight = Math.round(divWidth * (pct/100));
	newHeight = newHeight  + 'px';
	div.height(newHeight);
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
