class Timeline {
  constructor(user) {
    this.user = user;
    this.photos = [];
  }

  addToTimeline(photo) {
    this.photos.push(photo);
  }
}

module.exports = {
  Timeline
}
