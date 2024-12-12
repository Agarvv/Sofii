import express from 'express';
import { Request, Response } from 'express'
import * as dotenv from 'dotenv'

const app = express();

app.get('/', (req: Request, res: Response) => {
    res.send('Sofii API Migration to TypeScript is OK!');
});

app.listen(process.env.PORT || 3000, () => {
    console.log('Sofii API started on port 3000');
})