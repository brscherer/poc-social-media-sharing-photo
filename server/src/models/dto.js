const { User } = require('./user');
const { Photo } = require('./photo');
const { Tag } = require('./tag');
const { Comment } = require('./comment');

class Database {
  constructor() {
    this.users = [];
    this.userIdCounter = 0
    this.photos = [];
    this.photosIdCounter = 0
    this.tags = [];
    this.tagsIdCounter = 0
  }

  initializeWithUsers(usersData) {
    usersData.forEach(userData => {
      this.createUser(userData.name);
    });
  }

  createUser(name) {
    const newUser = new User(name, ++this.userIdCounter);
    this.users.push(newUser);
    return newUser;
  }

  createPhoto(url, user) {
    const newPhoto = new Photo(url, user);
    this.photos.push(newPhoto);
    return newPhoto;
  }

  createTag(name) {
    const newTag = new Tag(name);
    this.tags.push(newTag);
    return newTag;
  }

  createComment(text, user) {
    return new Comment(text, user);
  }
}

module.exports = {
  Database
}
