const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from Express.js server!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const db =mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tutor_db"
})

app.post('/registeruser', (req,res)=>{
  const sql = "INSERT INTO users (`user_username`,`user_fullname`,`user_password`,`user_email`,`user_phonenum`) VALUES (?,?,?,?,?)";
  const values=[
    req.body.user_username,
    req.body.user_fullname,
    req.body.user_password,
    req.body.user_email,
    req.body.user_phonenum,
  ]
  db.query(sql, values, (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    return res.json(data);
  })
})

app.post('/loginuser', (req,res)=>{
  const sql = "SELECT * FROM users WHERE `user_username`= ? AND `user_password` = ?";
  db.query(sql, [req.body.user_username, req.body.user_password], (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    if(data.length > 0){
      return res.json("Success");
    }
    else{
      return res.json("Failed");
    }
    
  })
})

app.post('/registereducator', (req, res) => {
  const sql = "INSERT INTO educators (educator_username, educator_fullname, educator_password, subjects_taught, educator_email, educator_phonenum) VALUES (?, ?, ?, ?, ?, ?)";
  
  const values = [
      req.body.educator_username,
      req.body.educator_fullname,
      req.body.educator_password,
      JSON.stringify(req.body.subjects_taught), // Convert array to JSON string
      req.body.educator_email,
      req.body.educator_phonenum
  ];

  db.query(sql, values, (err, data) => {
      if (err) {
          return res.json("Error posting data");
      }
      return res.json(data);
  });
});
  
app.post('/logineducator', (req,res)=>{
  const sql = "SELECT * FROM educators WHERE `educator_username`= ? AND `educator_password` = ?";
  db.query(sql, [req.body.educator_username, req.body.educator_password], (err,data)=>{
    if (err){
      return res.json("Error posting data");
    }
    if(data.length > 0){
      return res.json("Success");
    }
    else{
      return res.json("Failed");
    }
    
  })
})

app.get('/users', (req, res) => {
  // Retrieve all users from the database
  const sql = "SELECT * FROM users";
  db.query(sql, (err, data) => {
      if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json("Error fetching users");
      }
      res.json(data); // Send the list of users as a JSON response
  });
});

app.get('/educators', (req, res) => {
  // Retrieve all users from the database
  const sql = "SELECT * FROM educators";
  db.query(sql, (err, data) => {
      if (err) {
          console.error("Error fetching users:", err);
          return res.status(500).json("Error fetching educators");
      }
      res.json(data); // Send the list of users as a JSON response
  });
});

app.get('/users/:username', (req, res) => {
  const { username } = req.params;
  const query = `SELECT * FROM users WHERE user_username = ?`;
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const user = results[0];
    res.json(user);
  });
});



app.put('/users/:username', (req, res) => {
  const { username } = req.params;
  const updatedUserData = req.body;

  const query = `UPDATE users SET ? WHERE user_username = ?`;
  db.query(query, [updatedUserData, username], (err, results) => {
    if (err) {
      console.error('Error updating user data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User data updated successfully' });
  });
});

app.get('/educators/:username', (req, res) => {
  const { username } = req.params;
  const query = `SELECT * FROM educators WHERE educator_username = ?`;
  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error retrieving user data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    const user = results[0];
    res.json(user);
  });
});

app.put('/educators/:username', (req, res) => {
  const { username } = req.params;
  const updatedEducatorData = req.body;

  const query = `UPDATE educators SET ? WHERE educator_username = ?`;
  db.query(query, [updatedEducatorData, username], (err, results) => {
    if (err) {
      console.error('Error updating user data:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'Educator data updated successfully' });
  });
});

app.delete('/users/:username', (req, res) => {
  const { username } = req.params;
  const query = `DELETE FROM users WHERE user_username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error deleting user:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }
    res.json({ message: 'User deleted successfully' });
  });
});

app.delete('/educators/:username', (req, res) => {
  const { username } = req.params;
  const query = `DELETE FROM educators WHERE educators.educator_username = ?`;

  db.query(query, [username], (err, results) => {
    if (err) {
      console.error('Error deleting educator:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    if (results.affectedRows === 0) {
      res.status(404).json({ error: 'Educator not found' });
      return;
    }
    res.json({ message: 'Educator deleted successfully' });
  });
});

app.get('/educators/subjects_taught/:subject', (req, res) => {
  const { subject } = req.params;
  const query = `SELECT * FROM educators WHERE JSON_CONTAINS(subjects_taught, JSON_ARRAY(?))`;
  db.query(query, [subject], (err, results) => {
    if (err) {
      console.error('Error retrieving educators for subject:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    res.json(results);
  });
});

app.post('/createappointment', (req, res) => {
  const { user_fullname, user_username, educator_fullname, educator_username, subject_name, date_booked } = req.body;

  const sql = "INSERT INTO appointments (user_fullname, user_username, educator_fullname, educator_username, subject_name, date_booked) VALUES (?, ?, ?, ?, ?, ?)";

  const values = [user_fullname, user_username, educator_fullname, educator_username, subject_name, date_booked];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error posting appointment:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json({ message: 'Appointment created successfully' });
  });
});

app.get('/appointments', (req, res) => {
  // Retrieve all appointments from the database
  const sql = "SELECT * FROM appointments";
  db.query(sql, (err, data) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json("Error fetching appointments");
    }
    res.json(data); // Send the list of appointments as a JSON response
  });
});

app.get('/appointments/:username/:subject', (req, res) => {
  const { username, subject } = req.params;

  // Retrieve all appointments for the specified educator and subject from the database
  const sql = "SELECT * FROM appointments WHERE `educator_username` = ? AND `subject_name` = ?";
  db.query(sql, [username, subject], (err, data) => {
    if (err) {
      console.error("Error fetching appointments:", err);
      return res.status(500).json("Error fetching appointments");
    }
    res.json(data); // Send the list of appointments as a JSON response
  });
});


app.post('/submitReview', (req, res) => {
  const { user_fullname, user_username, educator_fullname, educator_username, subject_name, review_text, review_date, sentiment_score } = req.body;

  const sql = "INSERT INTO reviews (user_fullname, user_username, educator_fullname, educator_username, subject_name, review_text, review_date, sentiment_score) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

  const values = [user_fullname, user_username, educator_fullname, educator_username, subject_name, review_text, review_date, sentiment_score];

  db.query(sql, values, (err, data) => {
    if (err) {
      console.error('Error posting review:', err);
      return res.status(500).json({ error: 'Internal server error' });
    }
    return res.json({ message: 'Review posted successfully' });
  });
});

app.listen(8081,()=>{
  console.log("listening");
})
