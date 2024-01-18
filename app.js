const express = require('express');
const app = express();
const port = 3000;

// Dummy data for available meeting slots
const slots = {
  '2:00': 4,
  '3:00': 4,
  '3:30': 4,
};

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

// Serve static files (CSS, images, etc.)
app.use(express.static('public'));

// Render the initial page
app.get('/', (req, res) => {
  res.render('index', { slots });
});

// Handle booking a meeting
app.post('/book', (req, res) => {
  const { time, name, email } = req.body;

  if (slots[time] > 0) {
    slots[time]--;
    res.render('confirmation', { name, email, time });
  } else {
    // Display an error message or redirect to an error page
    res.send('Error: No available slots for the selected time');
  }
});

// Handle canceling a meeting
app.post('/cancel', (req, res) => {
  const { time } = req.body;

  if (slots[time] < 4) {
    slots[time]++;
    res.redirect('/');
  } else {
    // Display an error message or redirect to an error page
    res.send('Error: Cannot cancel a meeting for an invalid time');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
