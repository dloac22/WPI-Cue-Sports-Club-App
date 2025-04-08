import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
const db = require('./db'); 

app.get('/api/matches', (req, res) => {
  db.query('SELECT * FROM matches', (err, results) => {
    if (err) {
      res.status(500).send({ message: 'Error fetching matches' });
    } else {
      res.json(results);
    }
  });
});

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
