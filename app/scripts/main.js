appState = {
  playSpeed: 1
}

leapConductor = {

  initialize: function() {
    this.initFlowPlayer();
    leapController.initialize();
  },

  initFlowPlayer: function() {
    flowplayer(function (api, root) {
      flowPlayer.api = api;

      api.bind('load', function () {
        flowPlayer.load(api);
        console.log('load');

      }).bind('ready', function () {
        flowPlayer.ready(api);
        console.log('reload');
      });
    });
  }
};


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
