

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
      this.api.speed(this.api.currentSpeed + .25);
    } else {
      this.api.speed(this.api.currentSpeed - .25);
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
