$(document).ready(function(){
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
;
