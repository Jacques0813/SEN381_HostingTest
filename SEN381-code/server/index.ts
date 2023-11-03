import express from 'express';
import { Express, Request, Response } from 'express';
import "reflect-metadata";
import { AppDataSource } from "./src/data-source"
import cors from "cors"
import dotenv from "dotenv";
import dbRoutes from './src/routes/database';
import mailRoutes from './src/routes/mail';
import bodyParser from 'body-parser';

AppDataSource.initialize().then(async () => {

  dotenv.config();

  console.log("Connected to database server");

  const app: Express = express();
  app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: process.env.CORS_METHODS,
  }));
  const port = process.env.PORT;

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.get('/', (req, res) => {
    res.send('Hey this is my API running 🥳')
  })
  app.use('/DB', dbRoutes);
  app.use('/mail', mailRoutes);

  app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
  });

}).catch(error => console.log(error))

export { AppDataSource };