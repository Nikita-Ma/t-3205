require('dotenv').config()


import express, {Request, Response, Express} from "express";

const app: Express = express()

// require middlewares
import {notFound, errorHandler} from "./middleware/errorMiddleware";
import {connectDB} from "./utils/connectDB";
import cors from "cors";


// connect DB
connectDB()


app.use(express.json())
app.use(express.urlencoded({extended: true}));
// Disable CORS
app.use(cors());


// routes
app.get('/', (req: Request, res: Response) => {
    res.json('Server running')
})

// use custom middlewares
app.use(notFound)

app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
    console.log('\x1b[32m' + `[SERVER] listen ${PORT}` + '\x1b[0m')
})