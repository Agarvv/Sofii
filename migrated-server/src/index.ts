import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import router from './routes';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Sofii API Migration to TypeScript is OK!');
});


const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Sofii API started on port ${port}`);
});