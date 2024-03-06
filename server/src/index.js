const express = require('express');
const multer = require('multer');
const path = require("node:path");
const bodyParser = require('body-parser');

const { Database } = require('./models');

const app = express();
const PORT = process.env.PORT || 3000;

const db = new Database();
const storage = multer.diskStorage({
  destination: path.join(__dirname, "uploads"),
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use(bodyParser.json());

const initialUsers = [
  { id: "1", name: 'Alice' },
  { id: "2", name: 'Bob' },
  { id: "3", name: 'Charlie' }
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

app.post('/upload', upload.single('file'), function(req, res) {
  console.log({req, res})
  if (!req.file) {
    res.status(413).send(`Error: File not uploaded`);
    return;
  }
  res.status(201).json({ message: "File uploaded"});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
