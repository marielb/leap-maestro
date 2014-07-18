console.log('\'Allo \'Allo!');


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



