$(document).ready(function() {
    appState = {
      playSpeed: 1
    }


    flowplayer(function (api, root) {
     
      api.bind("load", function () {
     
      // do something when a new video is about to be loaded
     
      }).bind("ready", function () {
     
        console.log(api);
        api.play();

        $(document).keypress(function (eh){ 

          if (eh.keyCode === 38) {
            appState.playSpeed += 0.1;
            api.speed(appState.playSpeed);
          } else if (eh.keyCode === 40) {
            appState.playSpeed -= 0.1;
            api.speed(appState.playSpeed);
          }

          console.log(eh.keyCode);
        });

     
      });
     
    });


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
  var swipeLeft = false;
  var current = Date.now();

  var timez = [];
  var average = null;

  swiper.update(function(g) {
    if (Math.abs(g.translation()[0]) > xTolerance || Math.abs(g.translation()[1]) > yTolerance) {
      var xDir = Math.abs(g.translation()[0]) > xTolerance ? (g.translation()[0] > 0 ? -1 : 1) : 0;
      var yDir = Math.abs(g.translation()[1]) > yTolerance ? (g.translation()[1] < 0 ? -1 : 1) : 0;
      // console.log("x direction: " + xDir + " y direction: " + yDir);

      if (xDir == -1 && swipeLeft == false) {
        swipeLeft = true;

        current = resetTime(current);
      } else if (xDir == 1 && swipeLeft == true) {
        swipeLeft = false;

        current = resetTime(current);
      } else if (yDir != 0) {
        adjustVolume(yDir);
      }
    }
  });

  ctl.connect();

  function resetTime(current) {
    diff = (Date.now() - current) / 1000;
    console.log(diff);

    if (timez.length < 9) {
        timez.push(diff);
    } else if (timez.length == 9) {
        var average = getAverage(timez);
        console.log("average: " + average);
    }

    return Date.now();
  }

  /**
   * returns average of the last 8 numbers of the array
   * @param  arr
   * @return void
   */
  function getAverage(arr) {
    var sum = 0;
    for (var x = 1; x < arr.length; x++) {
        sum = sum + arr[x];
    }

    return sum / 8;
  }

  /**
   * raises or lowers volume depending if the value is positive or negative
   * @param  val
   * @return void
   */
  function adjustVolume(val) {
    if (val < 0) {
        console.log("lower volume by a tiny bit");
    } else {
        console.log("raise volume by a tiny bit");
    }
  }
});