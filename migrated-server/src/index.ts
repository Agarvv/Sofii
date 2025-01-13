import express, { Express, Request, Response, NextFunction } from 'express';
import * as dotenv from 'dotenv';
import router from './routes';
import sequelize from './config/database';
import bodyParser from 'body-parser'; 

dotenv.config();

const app: Express = express();

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);
  res.status(err.status || 500).json({ message: err.message || 'Internal Server Error' });
});


app.use(express.json()); 

app.use(router);

app.get('/', (req: Request, res: Response) => {
  res.send('Sofii API Migration to TypeScript is OK!');
});

const port = process.env.PORT || 3000;

app.listen(port, async () => {
  console.log(`Sofii API started on port ${port}`);
  
  try {
    await sequelize.sync({ force: true })
    console.log("Database Connected Successfully.");
    
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
});