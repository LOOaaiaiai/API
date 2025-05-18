import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Command queue (FIFO)
let commandQueue = [];

app.post('/api/command', (req, res) => {
  const { command } = req.body;

  commandQueue.push({
    value: command,
    time: Date.now()
  });

  console.log("Command added:", command);
  res.send(`Command '${command}' added to queue.`);
});

app.get('/api/command', (req, res) => {
  if (commandQueue.length === 0) {
    return res.json({ value: null });
  }

  // Return and remove the first command in queue
  const nextCommand = commandQueue.shift();
  res.json(nextCommand);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
