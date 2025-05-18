import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory command store
let lastCommand = null;

app.post('/api/command', (req, res) => {
  const { command } = req.body;

  if (!command) return res.status(400).send("No command provided.");

  lastCommand = {
    value: command,
    time: Date.now()
  };

  console.log("Received command:", command);
  res.send(`Command '${command}' received`);
});

app.get('/api/command', (req, res) => {
  res.json(lastCommand || { value: null });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
