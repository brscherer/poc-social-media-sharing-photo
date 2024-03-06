class User {
  constructor(name, idCounter) {
    this.id = idCounter
    this.name = name;
    this.uploadedPhotos = [];
  }

  uploadPhoto(photo) {
    this.uploadedPhotos.push(photo);
  }
}

module.exports = {
  User
}
