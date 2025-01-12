import express, { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import router from './routes';
import sequelize from './config/database';

dotenv.config(); 

const app = express();

app.use(express.json());
app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Sofii API Migration to TypeScript is OK!');
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Sofii API started on port ${port}`);
  
  try {
    await sequelize.sync();
    console.log("Database Connected Successfully.");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});