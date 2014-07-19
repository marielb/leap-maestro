leapConductor = {

  // ytplayer or flow
  player: null,

  initialize: function() {
    leapController.initialize();

    $(document).keypress(function (eh){ 
      if (eh.keyCode === 38) {
        leapConductor.playSpeed += 0.1;
        leapConductor.player.speed(that.playSpeed);

      } else if (eh.keyCode === 40) {
        leapConductor.playSpeed -= 0.1;
        leapConductor.speed(that.playSpeed);
      }

    });

  }
};