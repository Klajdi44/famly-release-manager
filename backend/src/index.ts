import express, { Request, Response } from 'express';

const app = express();
const port = 5000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello Wod!');
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
});