

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
    if (speedChange < 1) {
      this.playSpeed -= 0.25;
      this.api.speed(this.playSpeed);
    } else {
      this.playSpeed += 0.25;
      this.api.speed(this.playSpeed);
    }
  },

  volume: function(volumeChange) {
    if (volumeChange < 0) {
      this.api.volume(this.api.volumeLevel - .1);
    } else {
      this.api.volume(this.api.volumeLevel + .1);
    }
  },

  load: function() {

  },

  ready: function() {
    var that = this;

    that.api.play();

    $('.video-exit').click(function() {
      that.api.stop();
    });

    $(document).keypress(function (eh){ 
      
      if (eh.keyCode === 38) {
        that.playSpeed += 0.1;
        that.api.speed(that.playSpeed);

      } else if (eh.keyCode === 40) {
        that.playSpeed -= 0.1;
        that.api.speed(that.playSpeed);
      }

    });
  }
}
