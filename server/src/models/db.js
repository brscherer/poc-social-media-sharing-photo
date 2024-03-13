const { User } = require('./user');
const { Photo } = require('./photo');

class Database {
  constructor() {
    this.users = [];
    this.userIdCounter = 0
    this.photos = [];
    this.photosIdCounter = 0
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

  createPhoto(filename, userId) {
    const user = this.users.find(u => u.id === userId)
    if (!user) {
      throw new Error("User not found")
    }
    const newPhoto = new Photo(filename, userId, ++this.photosIdCounter);

    // find a better way to sync infos on separate models
    this.photos.push(newPhoto);
    user.uploadPhoto(newPhoto)

    return newPhoto;
  }

  createTag(userId, photoId, tagId) {
    const user = this.users.find(u => u.id === userId)
    if (!user) {
      throw new Error("User not found")
    }
    const photo = user.uploadedPhotos.find(p => p.id === photoId)
    if (!photo) {
      throw new Error("Photo not found")
    }

    photo.addTag(tagId)
    return true;
  }

  createComment(userId, photoId, text) {
    const user = this.users.find(u => u.id === userId)
    if (!user) {
      throw new Error("User not found")
    }
    const photo = user.uploadedPhotos.find(p => p.id === photoId)
    if (!photo) {
      throw new Error("Photo not found")
    }

    const newComment = text;
    photo.addComment(newComment)
    return true
  }
}

module.exports = {
  Database
}
