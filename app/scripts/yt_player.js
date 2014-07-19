var ytPlayer = {
  playSpeed: 1,
  api: null,

  initialize: function(api) {
    this.api = api;
    window.api = api;

    this.api.playVideo();
  },

  speed: function(speedChange) {
    if (speedChange < 1) {
      this.playSpeed -= 0.5;
      this.api.setPlaybackRate(this.playSpeed);
    } else {
      this.playSpeed += 0.5;
      this.api.setPlaybackRate(this.playSpeed);
    }
  },

  volume: function(volumeChange) {
    var volume = this.api.getVolume();
    if (volumeChange < 0) {
      this.api.setVolume(volume - 10);
    } else {
      this.api.setVolume(volume + 10);
    }
  },

  stop: function() {
    this.api.stopVideo();
  }
}
