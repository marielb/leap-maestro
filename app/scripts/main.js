
flowPlayer.initialize();

function onYoutubePlayerReady(playerId) {
  var ytPlayer = document.getElementById();

  function play() {
    if (ytplayer) {
      ytplayer.playVideo();
    }
  }

}

$(document).ready(function() {
  
  leapConductor.initialize();
  
  $('#video-list li').click(function() {
    var vidName = $(this).data('link');
    $('#video-list').hide();
    $('.flowplayer').css({
      marginTop: '0',
      height: 'auto'
    });
    $('.flowplayer').show();
    $('.fp-engine').attr('src', '../videos/' + vidName);
    $('.video-exit').show();
  });

  $('.video-exit').click(function() {
    $(this).hide();
    $('.flowplayer').animate({
      marginTop: '300px',
      height: 0
    }, 200, function() {
      $('.flowplayer').hide();
      $('#video-list').fadeIn(400);
    });
    
  });
});
