$(document).ready(function() {
  var ctl = new Leap.Controller({enableGestures: true});

  ctl.on( 'connect' , function(){
    console.log( 'Successfully connected.' );
  });

  ctl.on( 'disconnect' , function(){
    console.log( 'LeapMotion disconnected.' );
  });

  var swiper = ctl.gesture('swipe');
  var xTolerance = 50;
  var yTolerance = 30;

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > xTolerance || Math.abs(g.translation()[1]) > yTolerance) {
      var xDir = Math.abs(g.translation()[0]) > xTolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > yTolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      console.log("x direction: " + xDir + " y direction: " + yDir);
    }
  });

  ctl.connect();
})