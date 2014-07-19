var leapController = {

  controller: new Leap.Controller({enableGestures: true}),

  swiper: null,
  xTolerance: 10,
  yTolerance: 80,
  swipeLeft: false,
  current: Date.now(),

  raiseCount: 0,
  lowerCount: 0,

  swipeDurations: [],

  average: null,
  currSpeed: null,

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
    var diff = (Date.now() - this.current) / 100;
    console.log(diff);

    // capture the average in the beginning
    if (this.average === null) {
      this.swipeDurations.push(diff);
      if (this.swipeDurations.length == 9) {
          this.average = this.getAverage(this.swipeDurations);
          this.swipeDurations = [];
          console.log('average: ' + this.average);
      }
    // keep track of tempo
    } else {
      this.swipeDurations.push(diff);
      if (this.swipeDurations.length == 4) {
          this.currSpeed = this.getAverage(this.swipeDurations);
          this.swipeDurations = [];
          console.log('average: ' + this.average + ' currspeed: ' + this.currSpeed);

          flowPlayer.speed((this.average / this.currSpeed));
          console.log('SPEED: ' + (this.average / this.currSpeed));
      }
    }

    return Date.now();
  }, 

  getAverage: function () { 
    var sum = 0; 
    for (var x = 1; x < this.swipeDurations.length - 1; x++) {
        sum = sum + this.swipeDurations[x];
    }

    return sum / (this.swipeDurations.length - 2);
  },

  adjustVolume: function (val) {
    if (val < 0) {
        this.raiseCount++;
        if (this.raiseCount == 8) {
          this.raiseCount = 0;
          console.log("raise volume by a tiny bit");
        };
    } else {
        this.lowerCount++;
        if (this.lowerCount == 8) {
          this.lowerCount = 0;
          console.log("lower volume by a tiny bit");
        };
    }
  }
}