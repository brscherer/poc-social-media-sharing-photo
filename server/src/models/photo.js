class Photo {
  constructor(url, user) {
    this.url = url;
    this.user = user;
    this.tags = [];
    this.comments = [];
  }

  addTag(tag) {
    this.tags.push(tag);
  }

  addComment(comment) {
    this.comments.push(comment);
  }
}

module.exports = {
  Photo
}
