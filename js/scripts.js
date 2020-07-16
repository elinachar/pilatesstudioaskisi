$(document).ready(function(){

  // Smooth scrolling on single-page
  var $root = $('html, body');
  $('.navbar-nav li a, .navbar-header a, .logo a, .contact-link, .scroll-top a ').click(function() {
    var hash = $.attr(this, 'href');
    if (hash != undefined && hash != '#') {
      var offset = top_offset();
      isRunningAnimation = true;
      $root.animate({
        scrollTop: $(hash).offset().top - offset
      }, 500, function () {
        return false; //not update hash on url
      });
    };

    // Close Collapsed navigation-bar when link clicked
    if ( ($(window).width() <= 767) ) {
      $(".navbar-collapse").removeClass("in");
    }

    return false;
  });

  // Fix Navbar on top
  // Fix Navbar on top for md and lg screens
  // Unfix Navbar for xs and sm screens
  toggleNavbarFixOnTop();

  $(window).on('resize', function() {
    toggleNavbarFixOnTop();
  });

  function toggleNavbarFixOnTop() {
    if ($(window).width() > 767) {
      $("nav").addClass("navbar-fixed-top");
    } else {
      $("nav").removeClass("navbar-fixed-top");
    }
  }

  // Scroll on top button
  //Get the button:
  scrollTopBtn = document.getElementById("scroll-top-btn");

  // When the user scrolls down 20px from the top of the document, show the button
  window.onscroll = function() {scrollFunction()};

  function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
      scrollTopBtn.style.display = "block";
      // If button is close to footer should stay above footer
      if($(window).scrollTop() + $(window).height() > $(document).height() - 40) {
        // Stop scroll-top-btn 3px upper than footer
        var bottomOffset = $("footer").height() + 3;
        $(scrollTopBtn).css("bottom", bottomOffset );
      }
    } else {
      scrollTopBtn.style.display = "none";
    }
  }

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

  // Typewriter effect
  // Function for tooggling only one event with vendor prefix when animation is
  // finished
  function whichAnimationEvent(){
    var t,
        el = document.createElement("fakeelement");

    var animations = {
      "animation"      : "animationend",
      "OAnimation"     : "oAnimationEnd",
      "MozAnimation"   : "animationend",
      "WebkitAnimation": "webkitAnimationEnd"
    }

    for (t in animations){
      if (el.style[t] !== undefined){
        return animations[t];
      }
    }
  };

  // Infinte typeWriter function and looping in job descriptions
  function typeWriter() {
    if (k < typewriterText[j].length) {
      if (k == 0) {
        $("#typewriter").text(typewriterText[j].charAt(k));
      } else {
        $("#typewriter").append(typewriterText[j].charAt(k));
      }
      k++;
      // setTimeout(typeWriter, 100, j);
      setTimeout(typeWriter, 85, j);
    } else {
      j++;
      if (j == 3) {
        j = 0;
      }
      k = 0;

      setTimeout(typeWriter, 900);
    }
  }

  // Call infine typeWriter animation
  var typewriterText = ["Στα 10 μαθήματα νοιώθεις τη διαφορά ...", "... στα 20 τη βλέπουν όλοι ...", "... στα 30 έχεις ένα νέο σώμα!"];
  var k = 0, j = 0;
  typeWriter(j);


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
  var offset = 0;
  var screenWidth = $(document).width();
  if (screenWidth >= 768) {
    var hLogo = $(".logo").height();
    var hNavbar = $(".navbar").height();
    offset = hLogo + hNavbar - 10;
  } else {
    offset = $(".navbar-collapse").height();
  };
  return offset
}

// After document is loaded
$(window).load(function(){
  // After Google maps have been loaded
  // Add alt tags to all of it images for SEO needs.
  altImgMap();
  function altImgMap() {
    if (typeof google === 'object' && typeof google.maps === 'object') {
      // Get all the images in the google map
      var googleMapImages = $("#map img");
      // Check which images do not have alt attribute and add an empty one
      googleMapImages.each(function( index, value ) {
        if (typeof $(value).attr("alt")== typeof undefined || $(value).attr("alt") == false) {
          $(value).attr("alt" , "Google Maps");
        }
      })
    }
  };
});

// PARALLAX EFFECT
// resize the image(s) on page resize
$(window).on('resize', function(){
	resize_all_parallax();
});

// Parallax effect (https://inkplant.com/code/responsive-parallax-images)
// keep all of your resize function calls in one place so you don't have to edit them twice (on page load and resize)
function resize_all_parallax() {
  var lDivId = ['bkg-1', 'bkg-2']; /* the ID of the div that you're resizing */
  var lImgW = [1920, 1477]; /* the width of your image, in pixels */
  var lImgH = [1080, 831]; /* the height of your image, in pixels */

  for (i = 0; i < lDivId.length; i++) {
	  resize_parallax(lDivId[i], lImgW[i], lImgH[i]);
  };
}

// this resizes the parallax image down to an appropriate size for the viewport
function resize_parallax(divId, imgW, imgH) {
	var div = $('#' + divId);
	var divWidth = div.width();
	if (divWidth < 768) { var pct = (imgH/imgW) * 100; } /* show full image, plus a little padding, if on static mobile view */
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
  if (screenWidth >= 768) {
    $(".logo").show();
  } else {
    $(".logo").hide();
  }
}

// API Google Map
function initMap() {
  // The location of position
  var pos = {lat: 35.326293, lng: 25.123714};
  // The map, centered at position
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: pos
  });
  // The marker, positioned at position
  var marker = new google.maps.Marker({position: pos, map: map});
};
