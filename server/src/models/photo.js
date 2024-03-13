class Photo {
  constructor(filename, userId, idCounter) {
    this.id = idCounter;
    this.filename = filename;
    this.userId = userId;
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
