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