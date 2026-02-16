import express from "express"
import connectionPool from "./utils/db.mjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import dotenv from "dotenv";
import bookRouter from "./routes/book.mjs";
import authenRouter from "./routes/authentication.mjs";
import { validatePostData } from "./middlewares/bookpost.validation.mjs";


dotenv.config();
const app = express();
app.use(express.json());
const port = 4000;

app.use(authenRouter)
app.use("/book",bookRouter)



app.listen(port, () => {
    console.log(`Server running at ${port}`);
});
