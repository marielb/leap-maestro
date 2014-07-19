
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
  
  // hide video list and show video
  $('#video-list li.video-flow').click(function() {
    var vidName = $(this).data('link');
    $('#video-list').hide();
    $('.flowplayer').css({
      marginTop: '0',
      height: 'auto'
    });
    $('.flowplayer').show();
    $('.fp-engine').attr('src', '../videos/' + vidName);
    $('.flowplayer .video-exit').show();
  });

  // hide flowplayer video and show list
  $('flowplayer .video-exit').click(function() {
    $(this).hide();
    $('.flowplayer').animate({
      marginTop: '300px',
      height: 0
    }, 200, function() {
      $('.flowplayer').hide();
      $('#video-list').fadeIn(400);
    });
  });

  // hide youtube video and show list
  $('.ytplayer.video-exit').click(function() {
    $(this).hide();
    $('#ytplayer').hide();
    $('#video-list').fadeIn(400);
  });

  // show youtube video
  $('.load-youtube').click(function() {
    $('#video-list').hide();

    // set video
    var videoID = $('.video-id').val();
    var url = 'http://www.youtube.com/v/' + videoID + '&enablejsapi=1&playerapiid=ytplayer&version=3';
    console.log(url);
    var atts = { id: "ytplayer" };
    var params = {allowScriptAccess: "always"};
    swfobject.embedSWF(url, "ytplayer", "900", "620", "8", null, null, params, atts);

    $('#ytplayer').css('display', 'block');
    $('.ytplayer.video-exit').show();
    $('.video-id').val("");
  });
});
