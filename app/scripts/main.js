
flowPlayer.initialize();

$(document).ready(function() {
  
  leapConductor.initialize();
  
  $('#video-list li').click(function() {
    var vidName = $(this).data('link');
    $('#video-list').hide();
    $('.flowplayer').show();
    $('.fp-engine').attr('src', '../videos/' + vidName);
    $('.video-exit').show();
  });

  $('.video-exit').click(function() {
    $(this).hide();
    $('.flowplayer').fadeOut(500);
    $('#video-list').fadeIn(500);
  });
});
