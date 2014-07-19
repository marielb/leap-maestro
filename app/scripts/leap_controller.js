var leapController = {

  controller: new Leap.Controller({enableGestures: true}),

  swiper: null,
  xTolerance: 50,
  yTolearnce: 30,
  swipeLeft: false,
  current: Date.now(),

  swipeDurations: [],

  average: null,

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
          adjustVolume(yDir);
        }
      }
    });

    this.controller.connect();    
  },

  resetTime: function () {
    diff = (Date.now() - this.current) / 1000;
    console.log(diff);

    if (this.swipeDurations.length < 9) {
        this.swipeDurations.push(diff);
    } else if (this.swipeDurations.length == 9) {
        this.average = this.getAverage(this.swipeDurations);
        console.log('average: ' + this.average);
    }

    return Date.now();
  }, 

  getAverage: function () { 
    var sum = 0; 
    for (var x = 1; x < this.swipeDurations.length; x++) {
        sum = sum + this.swipeDurations[x];
    }

    return sum / 8;
  },

  adjustVolume: function (val) {
    if (val < 0) {
        console.log("lower volume by a tiny bit");
    } else {
        console.log("raise volume by a tiny bit");
    }
  }
}