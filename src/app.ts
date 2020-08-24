import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import Logger from "./libraries/logger";
import cors from "cors";
import router from "./components";
import initiateMongodb from "./database/mongodb";

const stream = {
    write: (text: string) => {
      Logger.info(text);
    },
  };


initiateMongodb();
  
const app = express();

app.use(cors());

if (process.env.NODE_ENV === 'development')  app.use(morgan('tiny'));
else app.use(morgan('combined', { stream }));
  
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

app.use('/api', router);

export default app;
