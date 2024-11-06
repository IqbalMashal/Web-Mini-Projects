const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();

const HTTP_PORT = process.env.PORT || 8080;

const booksFilePath = path.join(__dirname, 'data', 'books.json');
const membersFilePath = path.join(__dirname, 'data', 'members.json');

// Helper function to read JSON data from files
const readDataFromFile = (filePath) => {
  try {
    const data = fs.readFileSync(filePath);
    return JSON.parse(data);
  } catch (err) {
    console.error('Error reading file:', err);
    return [];
  }
};

const writeDataToFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error('Error writing to file:', err);
  }
};

// Load books and members data from files
let books = readDataFromFile(booksFilePath);
let members = readDataFromFile(membersFilePath);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.redirect('/books');
});

// Display books
app.get('/books', (req, res) => {
  res.render('books', { books });
});

// Add book form
app.get('/books/add', (req, res) => {
  res.render('addbooks');
});

// Handle adding a book
app.post('/books/add', (req, res) => {
  const { title, author, isbn, category } = req.body;
  const newBook = {
    id: books.length + 1,
    title,
    author,
    isbn,
    category
  };
  books.push(newBook);
  writeDataToFile(booksFilePath, books);  
  res.redirect('/books');
});

app.get('/books/delete', (req, res) => {
  res.render('deletebooks');
});

app.post('/books/delete', (req, res) => {
  const { title, author } = req.body;
  books = books.filter(book => book.title !== title || book.author !== author);
  writeDataToFile(booksFilePath, books);  // Save to file
  res.redirect('/books');
});

app.get('/members', (req, res) => {
  res.render('members', { members });
});

// Add member form
app.get('/members/add', (req, res) => {
  res.render('addmembers');
});

// Handle adding a member
app.post('/members/add', (req, res) => {
  const { name, membershipId, contactNumber, expiryDate } = req.body;
  const newMember = {
    id: members.length + 1,
    name,
    membershipId,
    contactNumber,
    expiryDate
  };
  members.push(newMember);
  writeDataToFile(membersFilePath, members);  
  res.redirect('/members');
});

app.get('/members/delete', (req, res) => {
  res.render('deletemembers');
});

app.post('/members/delete', (req, res) => {
  const { membershipId } = req.body;
  members = members.filter(member => member.membershipId !== membershipId);
  writeDataToFile(membersFilePath, members);  // Save to file
  res.redirect('/members');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  const status = err.status || 500;
  res.status(status).json({
    error: {
      message: err.message || 'Internal Server Error',
      status: status
    }
  });
});

app.listen(HTTP_PORT, () => {
  console.log(`Express http server listening on: ${HTTP_PORT}`);
});
