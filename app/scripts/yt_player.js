var ytPlayer = {
  playSpeed: 1,
  api: null,

  initialize: function(api) {
    this.api = api;
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
    if (volumeChange < 0) {
      this.setVolume(this.api.volumeLevel - .1);
    } else {
      this.setVolume(this.api.volumeLevel + .1);
    }
  }
}
