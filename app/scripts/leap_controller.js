var leapController = {

  controller: new Leap.Controller({enableGestures: true}),

  swiper: null,
  xTolerance: 20,
  yTolerance: 60,
  swipeLeft: false,
  current: Date.now(),

  raiseCount: 0,
  lowerCount: 0,

  swipeDurations: [],

  originalTempo: null,
  currTempo: null,

  initialize: function() {
    var that = this;

    this.controller.on( 'connect' , function(){
      $('.connected').show();
      $('.disconnected').hide();
      console.log( 'Successfully connected.' );
    });

    this.controller.on( 'disconnect' , function(){
      $('.connected').hide();
      $('.disconnected').show();
      console.log( 'LeapMotion disconnected.' );
    });

    this.swiper = this.controller.gesture('swipe');

    this.swiper.update(function(g) {
      if (Math.abs(g.translation()[0]) > that.xTolerance || Math.abs(g.translation()[1]) > that.yTolerance) {
        
        var xDir = Math.abs(g.translation()[0]) > that.xTolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
        var yDir = Math.abs(g.translation()[1]) > that.yTolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;

        if (xDir === -1 && that.swipeLeft === false) {
          that.swipeLeft = true;
          that.current = that.resetTime();
        } else if (xDir === 1 && that.swipeLeft === true) {
          that.swipeLeft = false;
          that.current = that.resetTime();
        } else if (yDir != 0) {
          that.adjustVolume(yDir);
        }
      }
    });

    this.controller.connect();    
  },

  resetTime: function () {
    var bpm = 60000 / (Date.now() - this.current);

    bpm = Math.round(bpm * 1) / 1;
    console.log("BPM: " + bpm);

    // keep track of tempo
    this.swipeDurations.push(bpm);
    if (this.swipeDurations.length == 3) {
      this.currTempo = this.getoriginalTempo(this.swipeDurations);
      this.swipeDurations = [];

      if (this.originalTempo != null) {
        var newRatio = (this.originalTempo / this.currTempo);
        console.log('new speed: ' + this.currTempo);
        $(".current-tempo").html(this.currTempo + " BPM&nbsp;&nbsp;");

        leapConductor.player.speed(1 - newRatio);
      } else {
        this.originalTempo = this.currTempo;

        console.log('AVERAGE SET: ' + this.currTempo);
        $(".original-tempo").html(this.originalTempo + " BPM");
      }
    }

    return Date.now();
  }, 

  getoriginalTempo: function () { 
    var sum = 0; 
    for (var x = 1; x < this.swipeDurations.length - 1; x++) {
        sum = sum + this.swipeDurations[x];
    }

    return sum / (this.swipeDurations.length - 2);
  },

  adjustVolume: function (val) {
    if (val < 0) {
        this.raiseCount++;
        if (this.raiseCount == 20) {
          this.raiseCount = 0;
          leapConductor.player.volume(.1);
        };
    } else {
        this.lowerCount++;
        if (this.lowerCount == 30) {
          this.lowerCount = 0;
          leapConductor.player.volume(-.1);
        };
    }
  }
}