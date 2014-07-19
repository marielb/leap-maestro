

var flowPlayer = {
  playSpeed: 1,
  api: null,

  initialize: function() {
    var that = this;

    
    flowplayer(function (api, root) {
      that.api = api;

      that.api.bind('load', function () {
        that.load();
      }).bind('ready', function () {
        that.ready();
      });
    });
  },

  speed: function(speedChange) {
    if (speedChange == 0 
        || speedChange == Number.POSITIVE_INFINITY 
        || speedChange == Number.NEGATIVE_INFINITY) {
      return;
    }

    var speedChange = Math.round(speedChange * 10) / 10;
    console.log("Adjust speed to: " + (1 + speedChange));
    this.playSpeed = 1 + speedChange;
    this.api.speed(this.playSpeed);
  },

  volume: function(volumeChange) {
    var currentVolume = Math.round(this.api.volumeLevel * 100) / 100;

    this.api.volume(currentVolume + volumeChange);

    console.log("VOLUME: " + this.api.volumeLevel);
  },

  stop: function() {
    this.api.stopVideo();
  },

  load: function() {

  },

  ready: function() {
    var that = this;

    that.api.play();

    $('.video-exit').click(function() {
      that.api.stop();
    });

  }
}
