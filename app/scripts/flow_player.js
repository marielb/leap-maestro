
flowPlayer = {
  playSpeed: 1,

  load: function(api) {

  },

  ready: function(api) {
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
  }
}
