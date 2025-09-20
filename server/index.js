import express from "express";
import cors from "cors"
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello, guys!');
});

app.listen(PORT, () => {
  console.log(`Server is running at PORT:${PORT}`);
});
