import  express  from "express";

import dotenv from 'dotenv';


import morgan from "morgan";

import connectDB from "./config/db.js";

import bodyParser from "body-parser";

import StudentRoutes from "./routes/StudentRoutes.js";

// initializing express
const app = express();

//config env

dotenv.config();

// middleware json file checker and bodyparser
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());

//database config
connectDB();

//routes Setup

app.use("/api/student", StudentRoutes);


//port declaration

const PORT = process.env.PORT || 8080;

//server start


app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

