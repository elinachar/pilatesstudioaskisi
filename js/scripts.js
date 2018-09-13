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


});

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
