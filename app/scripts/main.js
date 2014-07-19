$(document).ready(function() {
  var vid = $('#video-list li');
  $.each(vid, function() {
    var randomColor = Math.floor(Math.random()*16777215).toString(16);
    $(this).css('background-color', '#' + randomColor);
  });

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

  function getAverage(arr) {
    var sum = 0;
    for (var x = 1; x < timez.length; x++) {
        sum = sum + timez[x];
    }

    return sum / 8;
  }
});