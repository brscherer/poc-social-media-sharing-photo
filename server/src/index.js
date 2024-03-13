const express = require('express');
const multer = require('multer');
const path = require("node:path");
const bodyParser = require('body-parser');

const { Database } = require('./models');


// UTILS -----

function getFileName(userId, filename) {
  return `${userId}-${filename}`
}

// -----------

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database();
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, getFileName(req.params.userId, file.originalname));
  }
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());

const initialUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' }
];

db.initializeWithUsers(initialUsers);

app.get('/users', (req, res) => {
  res.status(200).json(db.users);
});

app.post('/users', (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ error: 'Name is required' });
  }

  const newUser = db.createUser(name);
  res.status(201).json(newUser);
});

app.post('/:userId/upload', upload.single('file'), function(req, res) {
  const { userId } = req.params
  if (!req.file) {
    res.status(413).send(`Error: File not uploaded`);
    return;
  }
  try {
    db.createPhoto(getFileName(req.params.userId, req.file.originalname), Number(userId))
  } catch (error) {
    res.status(500).json({ message: error});  
    return;
  }
  res.status(201).json({ message: "File uploaded"});
});

app.post('/:userId/:photoId/tag', function(req, res) {
  const { userId, photoId } = req.params
  const { userId: tagId } = req.body
  
  try {
    db.createTag(Number(userId), Number(photoId), Number(tagId))
  } catch ({ message }) {
    res.status(500).json({ message});  
    return;
  }
  res.status(201).json({ message: "Tag added"});
});

app.post('/:userId/:photoId/comment', function(req, res) {
  const { userId, photoId } = req.params
  const { text } = req.body
  
  try {
    db.createComment(Number(userId), Number(photoId), text)
  } catch ({ message }) {
    res.status(500).json({ message});  
    return;
  }
  res.status(201).json({ message: "Comment added"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
