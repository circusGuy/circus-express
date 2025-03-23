
const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '..','public')));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on ${PORT === 3000 ? "http" : "https"}://localhost:${PORT}`);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'tickets.html'));
});

app.get('/tickets', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'tickets.html'));
});

app.get('/schedule', (req, res) => {
  res.sendFile(path.join(__dirname,  '..', 'public', 'schedule.html'));
});

app.get('/gallery', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'gallery.html'));
});

app.get('/concessions', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'concessions.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'faq.html'));
});

app.get('/contact', (req, res) => {
  res.sendFile(path.join(__dirname, '..','public', 'contact.html'));
});

module.exports = app;
